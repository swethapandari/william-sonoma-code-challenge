# Williams-Sonoma-Code-Challenge

Using the json file provided, with an input of products, designed a page that: 
 * Displays the product details, including price, product name and the main hero image
 * Interacts intuitivley: Clicking on the image, you should see an overlay with a carousal of all thumbnail images
 * Responsive experience – 1 column on mobile to 3 columns on desktop

#### FrameWorks and Technologies Used ####

 Name                      | Version 
-------------------------- | ------- 
 vue.js                    | 2.6.11  
 bootstrap-vue             | 2.21.2   
 core-js                   | 3.6.5   
 axios                     | 0.21.1   
 jest                      | 26.5.3  
 babel-eslint              | 10.1.0  

* Initially copied the JSON data from Provided api URL to Projects Public folder which can be found here https://github.com/swethapandari/william-sonoma-code-challenge/tree/main/public 
* Used 'Axios' library to fetch the JSON response.
* Built Carousal modal and responsiveness of web page using 'Bootstrap-Vue'.


## Project Local setup
```
git clone https://github.com/swethapandari/william-sonoma-code-challenge.git
cd william-sonoma-code-challenge
npm install
```
#### Launching the Page ###

After Project setup you can locally :
```text
npm run serve
```
Upon successful run it shows on which port your app is running on your localhost
```text
 App running at:
  - Local:   http://localhost:8080/
 ```
Open the link and the page should appear as below.

#### Desktop ###

![image](https://user-images.githubusercontent.com/12513817/116504003-65fb0b00-a885-11eb-9608-3ff7a8b58056.png)

#### Mobile ###

![image](https://user-images.githubusercontent.com/12513817/116503947-449a1f00-a885-11eb-8e80-ac75d928c360.png)


#### Tests ####
Included Unit Test for each Component which can be tested locally using:
```text
npm run test
```
![image](https://user-images.githubusercontent.com/12513817/116503282-ab1e3d80-a883-11eb-8342-819166ad32cf.png)

Please send comments or questions at pandari.swetha@gmail.com
