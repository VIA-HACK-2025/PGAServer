export interface Task {
    parentId?: number;
    value: string
    status: Status
}

enum Status {
    Completed = 'completed',
    Not = 'not-completed',
}