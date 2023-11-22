/**
 * 
 * @param {'system' | 'user' | 'assistant'} role 
 * @param {string} content 
 * @returns {{
 *      role: 'system' | 'user' | 'assistant',
 *      content: string
 * }}
 */
export function buildMessage(role, content) {
    return {
        role,
        content,
    }
}