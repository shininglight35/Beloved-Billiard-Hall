test('HTML Format: Should have a valid DOCTYPE and Lang attribute', () => {
    expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
    expect(htmlContent).toMatch(/<html lang="en">/i);
});

test('JS Safety: Ensure all logic is contained within <script> tags', () => {
    // This regex looks for common JS keywords NOT wrapped in <script> tags
    // If someone types "const app =" directly in the HTML body, this fails.
    const bodyContent = htmlContent.replace(/<script[\s\S]*?<\/script>/gi, '');
    const illegalJS = /const\s|let\s|var\s|function\s|=>/.test(bodyContent);

    expect(illegalJS).toBe(false);
});

test('HTML Structural Integrity: Every ">" must have a matching "<"', () => {
    const openingBrackets = (htmlContent.match(/</g) || []).length;
    const closingBrackets = (htmlContent.match(/>/g) || []).length;
    
    // If he removes a "<", these numbers won't match.
    expect(openingBrackets).toBe(closingBrackets);
});

test('JavaScript Integrity: All Brackets and Parentheses must be balanced', () => {
    // 1. Check Curly Braces {}
    const openBraces = (htmlContent.match(/{/g) || []).length;
    const closeBraces = (htmlContent.match(/}/g) || []).length;
    
    // 2. Check Parentheses ()
    const openParens = (htmlContent.match(/\(/g) || []).length;
    const closeParens = (htmlContent.match(/\)/g) || []).length;

    // The Gatekeeper logic: If these aren't equal, the code is broken!
    expect(openBraces).toBe(closeBraces);
    expect(openParens).toBe(closeParens);
});
