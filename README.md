npm i formik yup firebase axios react-router-dom date-fns semantic-ui-react semantic-ui-css react react-redux redux-devtools-extension


REACT DEV TOOLS
- install google Redux DevTools extension
- npm install redux-devtools-extension
- Apply middleware in redux store


FORM, VALIDATION
formik
yup - makes validation extremely easy

FIREBASE
1.) firebase
    -- Good for chat applications
    -- Cost: 
2.) Firestore
    -- Cost: Firestore costing is based on the number of queries so be mindful of this when you are using this.
    -- It is optimized for reading data rather than writing data
    -- NoSQL database
    -- More structured and scalable than firebase
    -- Documents can also contain Collections, and Collections can scale upto millions of documents without any performance implications
    -- Easier to query, can sort and filter at the same time
    -- Live updates on changes
    -- Each document can have a max of 1mb of data => approximately 1 million characters
    -- 20, 000 items in an array
    -- Relations are not as easy
    -- Be mindful of the cost per number of requests when designing you firestore CRUD infrastructure
3.) Cloud Functions
    -- They run code in the cloud
    -- They auto scale and are higly available
    -- First 2million invocations of the cloud functions is free. Then $0.40 per 1million after
    -- Cloud functions can write to any part of the app with full permissions. You have admin permissions with cloud functions
    -- You can try getting rid of unnecessary data in firestore using cron jobs to lower data storage, depending on of business requirements allow
    -- Cron jobs can be used to schedule when cloud functions happen e.g deleting chats older than a specific date to reduce the data usade and manage firebasse limitation
    -- Ordering and limit; You can only order by the same field that is in the filter


STYLING
semantic-ui-react 
semantic-ui-css
import 'semantic-ui-css/semantic.min.css';

react-toastify
index.js => import 'react-toastify/dist/ReactToastify.min.css'
App.jsx => <ToastContainer position="bottom-right" hideProgressBar />
usage => toast.error('Some text')

cuid = collusion resistant ids# react-fire-events


FILE UPLOAD
react-dropzone
cropper


CALENDAR
react-calendar

DATETIME
date-fns - Used to normalize js dates
Note that react-datepicker also uses date-fns. If you are having any issues, try using the same version that datepicker is using => npm ls date-fns = to see which packages depend on it in your app


ASYNCHRONOUS
redux-thunk allows us to use the store dispatch function inside our action creators


### TODOS
