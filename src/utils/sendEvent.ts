/**
 * Mock sendEvent util
 *
 * @param eventName - Name of the event (e.g. "faq_question_click")
 * @param payload - Extra data about the event
 */
export function sendEvent(eventName: string, payload: Record<string, any>) {
  console.log(`[MockEvent] ${eventName}`, payload);
}
