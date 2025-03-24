class Task {
    constructor(title, description, dueDate, priority) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.createdAt = new Date();
    }

    markCompleted() {
        if (!this.completed) {
            this.completed = true;
            this.completedAt = new Date();
            return true;
        }
        return false;
    }

    updateDetails(updates = {}) {
        try {
            if (updates.title) this.title = updates.title;
            if (updates.description) this.description = updates.description;
            if (updates.dueDate) this.dueDate = updates.dueDate;
            if (updates.priority) this.priority = updates.priority;
            this.lastUpdated = new Date();
            return true;
        } catch (error) {
            console.error('Error updating task:', error);
            return false;
        }
    }

    getStatus() {
        return {
            id: this.id,
            title: this.title,
            completed: this.completed,
            overdue: new Date(this.dueDate) < new Date() && !this.completed
        };
    }

    getDaysRemaining() {
        const due = new Date(this.dueDate);
        const today = new Date();
        const diffTime = due - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
}

export default Task;