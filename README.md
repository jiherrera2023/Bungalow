<h1>Bungalow App - HackMIT2020</h1>

**About**
College students across the nation are facing heightened levels of uncertainty surrounding COVID-19 and reliable off-housing campus options. Those options have historically been very inaccessible and not streamlined through a platform to connect seekers and sellers. Bungalow solves this problem by empowering students to be the first consideration in matching algorithms. Instead of looking for your best fit, Bungalow seeks to bring the best fit to you.

**Compiling**

```yarn install expo```
```expo install```
```expo start```
***Note:*** ```Config.js``` file is necessary for this App to run properly, this file is not pushed


**Backend**
Our backend is hosted in the following link:
```https://bungalow-api.herokuapp.com/```  
This heroku app uses this github repo:
```https://github.com/vincentyliu2001/bungalow-api```
Our algorithm is hosted in this following link:
``https://bungalow-filter.herokuapp.com/```
This heroku app doesn't use this github repo, but the source code is almost the same:
```https://github.com/vincentyliu2001/bungalow-algorithm```
**Overview of functionality:**
* Posting Sublets: Users can post sublets to our backend in the following form:
```
{
	images: Array[]
	title: "Example title"
	address: "Example Address"
	description: "Example Description"
	bathrooms: 2
	price: 750
	footage: 500
	bedrooms: 2
	phone: "1234567890"
	email: "example@gmail.com"
	name: "Example Name"
	latitude: 10
	longitude: -19
}
```
* Map of all Sublets: Users can view a map of all sublets.
* Liking Sublets: Users can like sublets, seen sublets are recorded and guaranteed to not be shown again to the user
* Shown sublets are tailored towards user preferences based on backend algorithm
* Home page allows for easy contacting via text message
