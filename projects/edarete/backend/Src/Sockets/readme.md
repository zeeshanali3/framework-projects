
---

### New [README.md](http://_vscodecontentref_/2) for Socket Architecture
This file will be placed in the `Sockets` directory and will focus on the overall architecture.

```markdown
# Socket Architecture

This document explains the overall architecture of the socket-based implementation for the **Quiz** and **Lab** features.

---

## Table of Contents
1. [Overview](#overview)
2. [Key Components](#key-components)
3. [Data Structures](#data-structures)
4. [Socket Communication](#socket-communication)

---

## Overview

The socket-based architecture is designed to handle real-time communication for the **Quiz** and **Lab** features. It supports:
- **Room-based communication** for managing participants.
- **Dynamic event handling** for quiz and lab operations.
- **Validation** for attendance, blocked users, and completed subcomponents.

---

## Key Components

1. **Socket Service**:
   - Manages the socket server and provides the `io` instance.

2. **Controllers**:
   - `QuizController`: Handles quiz-related events.
   - `LabController`: Handles lab-related events.

3. **Event Handlers**:
   - Define the socket events and their corresponding logic.

4. **Channels**:
   - Each quiz or lab is associated with a unique room for communication.

---

## Data Structures

- **Participants List**:
  - Tracks participants in a quiz or lab.

- **Staging Room Participants List**:
  - Tracks participants in the staging room before the quiz or lab starts.

- **Blocked Users List**:
  - Tracks users who are blocked from participating.

- **Completed Subcomponents List**:
  - Tracks completed quizzes or labs.

---

## Socket Communication

### Example: Quiz Flow
1. **Host Joins**:
   - Event: `join-quiz-host`
   - Payload: `{ quizId, hostInfo }`
2. **Participant Joins**:
   - Event: `connection-status`
   - Payload: `{ connected: true, participant }`
3. **Quiz Start**:
   - Event: `start-subComponent`
   - Payload: `{ quizId }`
4. **Answer Submission**:
   - Event: `submit-answer`
   - Payload: `{ questionId, answer, participant }`
5. **Quiz End**:
   - Event: `end-subComponent`
   - Payload: `{ quizId }`

---
