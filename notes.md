# Netlify deploy

1. Get netlify cli
1. Do not use env variables. It will be set to local values
1. `yarn build`
1. `netlify deploy`
1. `netlify deploy --prod`
1. Create file `_redirects` inside build folder with the content

        /*    /index.html  200
