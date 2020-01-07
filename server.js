const express = require('express');
const cors = require('cors');
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require('body-parser');


const url = "https://www.yell.com/s/estate+agents-uk.html";

const app = express();
app.use(cors());

app.get('/scraper', function(req,res){
    axios(url)
        .then(response => {
            //success
            const html = response.data;
            const $ = cheerio.load(html);
            let companiesList = $("article.businessCapsule");
            let companiesData = [];


            companiesList.each(function () {
                const name = $(this).find('span.businessCapsule--name').text();
                const address = $(this).find("a.businessCapsule--address").text();
                const phoneNumber = $(this).find("span.business--telephoneNumber").text();
                const website = $(this).find("div.icon-Business-website").parent().attr('href');
                const category = $(this).find("a.businessCapsule--classification").text();
                const currentDate = new Date();

                companiesData.push({
                    uri: name.replace(/\s/g,'').toLowerCase(),
                    name: name,
                    address: address.replace(/\r?\n|\r/g, ""),
                    phoneNumber: phoneNumber,
                    website: website,
                    category: category.replace(/\r?\n|\r/g, ""),
                    createdDate: currentDate.toLocaleString(),
                });
                if(companiesData.length >= 10) return false;
            });

            res.send(companiesData);
        })
        .catch(console.error);
});

app.use(bodyParser.json());

var port = process.env.PORT || 4000;
app.listen(port, () => console.log('Listening on port ' + port));