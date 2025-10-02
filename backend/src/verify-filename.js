import crypto from 'crypto';
import path from 'path';

// This is a standalone script to verify the filename generation logic from server.js
// It avoids the complexities of setting up a full test runner in this environment.

function getFilename(file, callback) {
    const sanitizedName = path.basename(file.originalname).replace(/[^a-zA-Z0-9.-]/g, '_');
    const randomPrefix = crypto.randomBytes(4).toString('hex');
    callback(null, `${Date.now()}-${randomPrefix}-${sanitizedName}`);
}

function runTest() {
    console.log('Running filename uniqueness test...');

    // Mock Date.now() to simulate simultaneous uploads
    const originalDateNow = Date.now;
    Date.now = () => 1678886400000; // A fixed timestamp

    const file = { originalname: 'test-file.txt' };
    const filenames = new Set();
    const iterations = 100;

    for (let i = 0; i < iterations; i++) {
        getFilename(file, (err, filename) => {
            if (err) {
                console.error('Error generating filename:', err);
                process.exit(1);
            }
            filenames.add(filename);
        });
    }

    // Restore original Date.now()
    Date.now = originalDateNow;

    if (filenames.size === iterations) {
        console.log(`✅ Success: Generated ${iterations} unique filenames.`);
        process.exit(0);
    } else {
        console.error(`❌ Failure: Expected ${iterations} unique filenames, but got ${filenames.size}.`);
        process.exit(1);
    }
}

runTest();