export interface Assignment {

    assignmentId?: string,
    assignmentName?: string,
    assignmentDescription?: string,
    comments?: string,
    dueDate?: Date,
    pathAttachment1?: string,
    pathAttachment2?: string,
    pathAttachment3?: string,
    pathAttachment4?: string,
    pathAttachment5?: string,
    createdBy?: string,
    batchId?: number,
    graderId?: string
}

export interface AssignmentSelect {
    assignmentName?: string;
    assignmentId?: string;
}



