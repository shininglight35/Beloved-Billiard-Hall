const fs = require('fs');
const path = require('path');

// Define your file map: { folder: [filenames] }
const testMap = {
    'public': ['index.html', 'player.html'],
    'public/admin': ['admin.html', 'index.html']
};

Object.entries(testMap).forEach(([folder, files]) => {
    files.forEach(fileName => {
        describe(`Testing ${folder}/${fileName} integrity`, () => {
            const filePath = path.resolve(__dirname, folder, fileName);

            if (!fs.existsSync(filePath)) {
                return; // Skips if the file doesn't exist yet
            }

            const htmlContent = fs.readFileSync(filePath, 'utf8');

            test('HTML Format: Should have a valid DOCTYPE and Lang attribute', () => {
                expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
                expect(htmlContent).toMatch(/<html lang="en">/i);
            });

            test('HTML Syntax: Brackets < > must be balanced (Ignoring JS Logic)', () => {

                const pureHTML = htmlContent
                    .replace(/<script[\s\S]*?<\/script>/gi, '')
                    .replace(/<style[\s\S]*?<\/style>/gi, '');

                const opening = (pureHTML.match(/</g) || []).length;
                const closing = (pureHTML.match(/>/g) || []).length;

                expect(opening).toBe(closing);
            });

            test('JS Syntax: Braces { } must be balanced', () => {
                const openBraces = (htmlContent.match(/{/g) || []).length;
                const closeBraces = (htmlContent.match(/}/g) || []).length;

                expect(openBraces).toBe(closeBraces);
            });

            test('JS Syntax: Parenthesis ( ) must be balanced', () => {
                const openParens = (htmlContent.match(/\(/g) || []).length;
                const closeParens = (htmlContent.match(/\)/g) || []).length;

                expect(openParens).toBe(closeParens);
            });

            test('Standard: Logic must be inside <script> tags', () => {
                const bodyOnly = htmlContent.replace(/<script[\s\S]*?<\/script>/gi, '');
                const hasIllegalJS = /const\s|let\s|var\s|function\s|=>/.test(bodyOnly);
                expect(hasIllegalJS).toBe(false);
            });
        });
    });
});
test('Security: Ensure no unauthorized files are in the root directory', () => {
    const rootFiles = fs.readdirSync(path.resolve(__dirname, './'));
    const htmlInRoot = rootFiles.filter(file => file.endsWith('.html'));
    expect(htmlInRoot.length).toBe(0); 
});
