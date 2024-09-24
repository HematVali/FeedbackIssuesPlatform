### To run the project:
- Clone the Repo on your machine and go to the repo directory.
- Make sure you got nodejs installed on your machine or else download it from here [Node.js](https://nodejs.org/).
- Make sure you got MongoDB database installed on your machine or else create a free account on Mongo Atlas, if you want to use the cloud version of MongoDB. [MongoDB](https://www.mongodb.com/cloud/atlas/register?utm_content=rlsapostreg&utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_general_retarget-brand-postreg_gic-null_emea-all_ps-all_desktop_eng_lead&utm_term=&utm_medium=cpc_paid_search&utm_ad=&utm_ad_campaign_id=14412646473&adgroup=131761130372&cq_cmp=14412646473&gad_source=1&gclid=Cj0KCQiA84CvBhCaARIsAMkAvkI2s52Z_yt0_Kuj7dgC19cbD9I34lTRSDt7IceZxeMgr3OUOGR4Q0AaAiOzEALw_wcB)
- In your cloned repo directory, type `npm install` which will install all the dependencies from `package.json` file.
- Inside the npm-demo folder, manually add an "uploads" folder. This will store the evidence you upload.
- Start your MongoDB datbase or if you're connected to Mongo Atlas, you can skip this step.
- Finally Modiy the index.js `(line number 16)` to update location of your MongoDB connection. `/playground` at the end of connection is just the collection name. This can be anything.
- Run your app by executing the following command in your project directory `node index.js`.

- Open another terminal and direct to the ticket-master folder.
- Enter command `npm run dev` (`sudo npm run dev` if you're a mac user)
- A link will be displayed which you need to enter into your web-browser
