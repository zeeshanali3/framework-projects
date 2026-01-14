// mockSocket.js
import { EventEmitter } from "events";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

class MockSocket extends EventEmitter {
  constructor() {
    super();
    this.state = {
      isInStandup: false,
      hasSubmittedToday: false,
      questions: [],
      currentQuestionIndex: 0,
      currentQuestionId: 0,
      parentId: null,
      answers: [],
    };
  }

  async init() {
    try {
      const res = await axios.get("http://localhost:3003/questions");
      this.state.questions = res.data || [];
      const pastRes = await axios.get("http://localhost:3003/pastResponses");
      const today = new Date().toISOString().slice(0, 10);
      this.state.hasSubmittedToday = pastRes.data.some((entry) =>
        entry.createdAt.startsWith(today)
      );
    } catch (error) {
      console.error("Failed to load questions:", error);
    }
  }

  connect() {
    console.warn("MockSocket connecting...");
    setTimeout(() => {
      console.warn("MockSocket connected.");
      this.emit("connected");
    }, 100);
  }

  async send(text) {
    const trimmed = text.trim().toLowerCase();
    this.emitUserMessage(text);
    // Trigger standup session
    if (
      (trimmed === "standup" || trimmed === "ready") &&
      !this.state.isInStandup
    ) {
      if (this.state.hasSubmittedToday) {
        this.emitBotMessage("You've already submitted a standup today.");
        return;
      }
      // ✅ show user's initial message
      this.resetSession();
      this.state.isInStandup = true;
      this.state.parentId = uuidv4();
      const parentId = this.state.parentId;
      const firstQ = this.state.questions[0];
      if (firstQ) {
        this.emitBotMessage(firstQ.text);
      }
      return;
    } else if (
      (trimmed === "end" || trimmed === "stop" || trimmed === "cancel") &&
      this.state.isInStandup
    ) {
      this.emitBotMessage("Standup session cancelled.");
      this.resetSession();
      this.state.isInStandup = false;
      return;
    }
    // If in standup, handle Q&A sequence
    if (this.state.isInStandup) {
      const currentQ = this.state.questions[this.state.currentQuestionIndex];
      if (!currentQ) return;

      const childId = uuidv4();
      this.state.answers.push({
        id: childId,
        parentId: this.state.parentId,
        question: currentQ.text,
        questionTimestamp: currentQ.timestamp || new Date().toISOString(),
        answer: text,
        answerTimestamp: new Date().toISOString(),
      });

      this.state.currentQuestionIndex++;

      // Emit next bot question
      if (this.state.currentQuestionIndex < this.state.questions.length) {
        const nextQ = this.state.questions[this.state.currentQuestionIndex];
        setTimeout(() => this.emitBotMessage(nextQ.text), 1000);
      } else {
        this.state.isInStandup = false;

        setTimeout(() => {
          const summaryHeader = "Thanks! Here's a summary of your standup:\n\n";
          const summaryBody = this.state.answers
            .map(
              (pair, index) =>
                `Q${index + 1}: ${pair.question}\nA: ${pair.answer}`
            )
            .join("\n\n");
          const fullSummary = summaryHeader + summaryBody;
          this.emitBotMessage(fullSummary);
        }, 1000);

        try {
          await axios.post("http://localhost:3003/pastResponses", {
            id: this.state.parentId,
            createdAt: new Date().toISOString(),
            entries: this.state.answers,
          });
          console.warn("Standup responses saved to pastResponses.");
        } catch (err) {
          console.warn("Failed to save pastResponses:", err);
        }
      }
    }
  }

  resetSession() {
    this.state.isInStandup = false;
    this.state.currentQuestionIndex = 0;
    this.state.currentQuestionId = 0;
    this.state.parentId = null;
    this.state.answers = [];
  }

  emitUserMessage(content) {
    const childId = uuidv4();
    this.emit("message", {
      type: "user",
      content,
      timestamp: new Date().toISOString(),
      id: childId,
      parentId: this.state.parentId,
    });
  }

  emitBotMessage(content) {
    const questionId = uuidv4();
    this.emit("message", {
      type: "bot",
      content,
      timestamp: new Date().toISOString(),
      id: questionId,
    });

    this.state.currentQuestionId = questionId;
  }
}

export const Socket = new MockSocket();
