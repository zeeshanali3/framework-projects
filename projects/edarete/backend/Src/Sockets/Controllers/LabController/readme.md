## Lab Flow

### 1. **User Joins Socket**
- A user connects to the server using a socket.
- The server validates the user based on their role and assigns them to the appropriate room:
  - **Student**: Added to `stagingRoomParticipants`.
  - **Host (Teacher/TA)**: Added to `host-${subComponentId}`.

### 2. **Emit Updated List to Host**
- Whenever a student joins, the updated list of students is emitted to the host channel using the `room-participants` event.

### 3. **Connection Status**
- When a student joins `stagingRoomParticipants`, the `connection-status` event is emitted. This event is used on the frontend to navigate the student to the QR code screen.

### 4. **QR Code or NFC Validation**
- A unique QR code is generated for each student based on their information.
- Alternatively, NFC tokens can be used for validation.
- The teacher or TA scans the QR code or NFC token, and the frontend emits the `mark-attendance` event.

### 5. **Mark Attendance**
- The server validates the QR code or NFC token and moves the student to the `subComponent` room where the lab is conducted.
- The `attendance-success` event is emitted to the student upon successful validation.

### 6. **Start Lab**
- The teacher or TA starts the lab by hitting the "Start" button on the web portal.
- This triggers the `start-subComponent` event, which emits `subComponent-started` to the `subComponent` room.

### 7. **Task Submission**
- Students submit their tasks using the `submit-answer` event.
- The server validates and stores the submissions.

### 8. **Lab Queries**
- Students can raise queries during the lab using the `hand-raise` event.
- The server stores the query and notifies the host using the `queries-received` event.
- Hosts can resolve queries using the `admin-rating` event, which updates the query status and notifies the student.

### 9. **Lab Completion**
- On the last task, both `submit-answer` and `subComponent-completed` events are triggered.
- The `subComponent-completed` event registers the student as having completed the lab. This is used to prevent rejoining.

### 10. **Validation on Rejoining**
- If a student tries to rejoin the socket after completing the lab, the server emits an error: "You have already completed the lab."

### 11. **Block User**
- If cheating is detected, the frontend emits the `block-user` event.
- The server disconnects the user and adds them to the blocked list. Blocked users cannot rejoin.

### 12. **Duplicate Connections**
- If a user tries to connect to the same lab from a different device (with a different `fcm_token`), they are disconnected, and an error is emitted.

### 13. **End Lab**
- The `end-subComponent` event disconnects all users from the `subComponent` room, closes the channel, and clears all states related to the socket.

---

## Lab Events

| Event Name              | Description                              |
|-------------------------|------------------------------------------|
| `start-subComponent`    | Starts the lab.                         |
| `submit-answer`         | Handles task submission.                |
| `hand-raise`            | Handles participant queries.            |
| `mark-attendance`       | Marks attendance for a participant.     |
| `subComponent-completed`| Marks the lab as completed.             |
| `end-subComponent`      | Ends the lab.                           |
| `block-user`            | Blocks a participant from the lab.      |
| `queries-received`      | Notifies the host of raised queries.     |
| `admin-rating`          | Resolves a query raised by a student.   |
| `query-attended`        | Notifies the student that their query is being attended. |

---

## Example: Lab Flow

1. **Host Joins**:
   - Event: `join-lab-host`
   - Payload: `{ labId, hostInfo }`
2. **Participant Joins**:
   - Event: `connection-status`
   - Payload: `{ connected: true, participant }`
3. **Lab Start**:
   - Event: `start-subComponent`
   - Payload: `{ labId }`
4. **Task Submission**:
   - Event: `submit-answer`
   - Payload: `{ taskId, answer, participant }`
5. **Lab End**:
   - Event: `end-subComponent`
   - Payload: `{ labId }`

---

## Example Diagram: Lab Flow

### Lab Flow Diagram
```mermaid
graph TD
    A[User Joins Socket] --> B[Server Validates User]
    B --> C{Is User a Student?}
    C -- Yes --> D[Add to stagingRoomParticipants]
    C -- No --> E[Add to host-${subComponentId}]
    D --> F[Emit Updated List to Host]
    D --> G[Emit connection-status Event]
    G --> H[Navigate to QR Code Screen]
    H --> I[Generate Unique QR Code or NFC Token]
    I --> J[Wait for QR Code/NFC to be Scanned]
    J --> K[Frontend Emits mark-attendance]
    K --> L[Move Student to subComponent Room]
    L --> M[Teacher/TA Starts Lab]
    M --> N[Emit subComponent-started Event]
    N --> O[Students Submit Tasks]
    O --> P[Validate and Store Submissions]
    P --> Q{Is Last Task?}
    Q -- Yes --> R[Trigger subComponent-completed Event]
    R --> S[Register User as Completed]
    Q -- No --> O
    S --> T[Prevent Rejoining Completed Lab]
    T --> U[Teacher/TA Ends Lab]
    U --> V[Disconnect All Users]
    V --> W[Clear All States]