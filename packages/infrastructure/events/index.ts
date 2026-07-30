interface DomainEvent {
  type: string;
  payload: Record<string, unknown>;
  organizationId: string;
  occurredAt: string;
}

class DomainEventBus {
  private listeners: Map<string, Set<(event: DomainEvent) => void | Promise<void>>> = new Map();

  subscribe(eventType: string, handler: (event: DomainEvent) => void | Promise<void>) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(handler);
  }

  publish(event: DomainEvent) {
    const handlers = this.listeners.get(event.type);
    if (handlers) {
      for (const handler of handlers) {
        handler(event);
      }
    }
  }
}

export const domainEventBus = new DomainEventBus();
