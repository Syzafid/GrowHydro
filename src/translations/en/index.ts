
// Main index file that imports and combines all translation files
import common from './common';
import home from './home';
import product from './product';
import blog from './blog';
import auth from './auth';
import account from './account';
import about from './about';
import contact from './contact';
import errors from './errors';

// Combine all translation modules
const translations = {
  ...common,
  ...home,
  ...product,
  ...blog,
  ...auth,
  ...account,
  ...about,
  ...contact,
  ...errors,
};

export default translations;
