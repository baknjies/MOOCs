const crowdinAPI = require('crowdin-api');
const CROWDIN_API = 'https://api.crowdin.com/api/v2'
const CROWDIN_PROJECT_ID = '580127'
const CROWDIN_MTS_ID = '372727'
const CROWDIN_API_KEY = '7ab2599a42f3aa76170d1c8bb7c2464ba3f16143c77d5fa9abd5e0edf19eeecf5880aa49fc06c431'
const STORAGE_ID = 1845177783
const crowdin = new crowdinAPI({
    apiKey: CROWDIN_API_KEY,
    projectName: 'Open Science MOOCs',
})
const axios = require('axios');
// // Example API route
// app.get('/api/course/:id', async (req, res) => {
//     const courseId = req.params.id;
//     const courseData = await fetchCourseData(courseId);
//     const translatedCourseData = await translateCourseData(courseData, TARGET_LANG);

//     res.json(translatedCourseData);
// });

// // Fetch course data from MongoDB
// async function fetchCourseData(courseId) {
//     // Your MongoDB code here
// }

// // Translate course data using CROWDIN API
// async function translateCourseData(courseData, targetLang) {
//     const response = await axios.post(
//         `${CROWDIN_API_ENDPOINT}/translations`,
//         {
//             projectId: 'YOUR_PROJECT_ID', // Replace with your CROWDIN project ID
//             languageId: targetLang,
//             files: [
//                 {
//                     name: 'course_data.json', // Replace with your file name
//                     content: JSON.stringify(courseData),
//                 },
//             ],
//             autoApproveOption: '1',
//         },
//         {
//             headers: {
//                 'Authorization': `Bearer ${CROWDIN_API_KEY}`,
//                 'Content-Type': 'application/json',
//             },
//         }
//     );

//     return JSON.parse(response.data.translations[0].data);
// }

const auth = {
    headers: {
        authorization: 'Bearer ' + CROWDIN_API_KEY,
        'Content-Type': 'application/json',
        'Crowdin-API-FileName': 'MOOCS API',
    },
}

async function translateResponse(doc_to_translate) {
    try {
        let data = doc_to_translate.toObject()
        /**
         * An object that contains the keys of the strings 
         * to translate and their index in the strings_to_translate array
         * */
        const keys = { } 
        const strings_to_translate = []

        // The keys that we want to translate
        const dictionary = {
            'title': 'title',
            'description': 'description',
        }

        let count = 0
        // Get the keys of the strings to translate
        for (const key in data) {
            if (dictionary[key]) {
                // Add the key and its index in the strings_to_translate array
                keys[key] = count
                count++
                strings_to_translate.push(data[key])
            }
        }

        const res = await axios.post('https://api.crowdin.com/api/v2/mts/372727/translations', {
            "languageRecognitionProvider": "crowdin",
            "targetLanguageId": "ar",
            "sourceLanguageId": "en",
            "strings": strings_to_translate,
        }, auth)

        const translated_strings = res.data.data.translations

        // Replace the strings with their translations
        for (const key in keys) {
            data[key] = translated_strings[keys[key]]
        }

        return data
    } catch (error) {
        return error
    }
}

module.exports = {
    translateResponse
}
