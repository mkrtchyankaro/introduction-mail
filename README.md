Please fork this project and add your code on top of it.

The project contains:
* Two example modules: cats and dogs, that demonstrate to code best practices that we expect you to follow as far as angular 2 components / services / api layers should work and interact
* Mocking services that allows your business logic code to get sample response from vendors-related API calls
  * You may find a usage example of these mocks in app.component.ts just for clarity, however, follow the best practices in dogs module as far as where these api calls should be located.
  * The mocks themselves are located under vendors/api, there is no need to access them directly

NOTE: The ConfigurationApiService class (of package client-toolbox) should help you resolve countyCode and typeCode to full country and type name respectively.
The responseObserver() will return an observable of ConfigurationResponse that holds an instance of a Configuration object.
Then, the countryByCode method will take a country code and return a Country object with all the necessary fields.
The same logic can be applied to the categoryById method.


