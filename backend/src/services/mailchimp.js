import mailchimp from '@mailchimp/mailchimp_marketing';

// Configure Mailchimp
mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., 'us1', 'us2', etc.
});

/**
 * Subscribe a user to the Mailchimp newsletter
 * @param {string} email - User's email address
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name (optional)
 * @returns {Promise<boolean>} - Success status
 */
export async function subscribeToNewsletter(email, firstName, lastName = '') {
    try {
        const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
        
        if (!audienceId || !process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX) {
            console.warn('Mailchimp configuration missing. Skipping newsletter subscription.');
            return false;
        }

        const response = await mailchimp.lists.addListMember(audienceId, {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName || '',
            },
            tags: ['fileninja-user', 'auto-subscribed'],
        });

        console.log(`Successfully subscribed ${email} to newsletter. Member ID: ${response.id}`);
        return true;
    } catch (error) {
        // Handle specific Mailchimp errors
        if (error.status === 400 && error.title === 'Member Exists') {
            console.log(`User ${email} is already subscribed to the newsletter.`);
            return true; // Consider this a success since they're already subscribed
        }
        
        console.error('Mailchimp subscription error:', error);
        return false;
    }
}

/**
 * Update user information in Mailchimp
 * @param {string} email - User's email address
 * @param {Object} updates - Fields to update
 * @returns {Promise<boolean>} - Success status
 */
export async function updateNewsletterMember(email, updates) {
    try {
        const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
        
        if (!audienceId || !process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX) {
            console.warn('Mailchimp configuration missing. Skipping member update.');
            return false;
        }

        // Get the subscriber hash
        const subscriberHash = require('crypto')
            .createHash('md5')
            .update(email.toLowerCase())
            .digest('hex');

        const response = await mailchimp.lists.updateListMember(
            audienceId,
            subscriberHash,
            {
                merge_fields: updates,
            }
        );

        console.log(`Successfully updated ${email} in newsletter.`);
        return true;
    } catch (error) {
        console.error('Mailchimp update error:', error);
        return false;
    }
}

/**
 * Test Mailchimp connection
 * @returns {Promise<boolean>} - Connection status
 */
export async function testMailchimpConnection() {
    try {
        if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX) {
            return false;
        }

        const response = await mailchimp.ping.get();
        console.log('Mailchimp connection test successful:', response);
        return true;
    } catch (error) {
        console.error('Mailchimp connection test failed:', error);
        return false;
    }
}
