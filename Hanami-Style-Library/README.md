# Hanami Style Library
## How to
### If you already use Bootstrap you are good to go. I did only a few changes that helped me complete a Project
the maximum width of a `.container` would be 1440. Because 1440 / 12 the total column span gives me an integer
ex. `1440px / 12 columns` every column would be 120px. For me easy to work with.

> Remember to alway put the custom.css file that you find in the example after including bootstrap.css

[Bootstrap Docs](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

`.center` added special center class to center every column no matter the column span.
Sometimes when you have columns of different sizes, with `col-*-n-offset-n` it's very tricky to center the columns.
so just put the .center class in the parent .row and it's done
```
<div class="row content center">
                  <div class="card-sx col-md-5">
                      <div class="card-title">Card Title</div>
                      <div class="card-content">
                          <p class="card-content-element">card-content-element</p>
                          <p class="card-content-element">card-content-element</p>
                          <p class="card-content-element">card-content-element</p>
                          <p class="card-content-element">card-content-element</p>
                          <p class="card-content-element">card-content-element</p>
                          <p class="card-content-element">card-content-element</p>
                      </div>
                  </div>
                  <div class="card-dx col-md-5">
                      <div class="card-title">Card Title</div>
                      <div class="card-content">
                          <p class="card-content-element">card-content-element</p>
                          <p class="card-content-element">card-content-element</p>
                          <p class="card-content-element">card-content-element</p>
                          <p class="card-content-element">card-content-element</p>
                          <p class="card-content-element">card-content-element</p>
                      </div>
                  </div>
              </div>
```
## How to install the Library

### Composer
```
composer require hanamisoftware/hanami-style-library

```
# A very special Thank You to the Bootstrap Community for building this fantastic Frontend Toolkit
Of course I left all the copyright and licenses in place.
If it happen that you fork the project and you would like to make it nicer, please leave the copyright to whom it belogs (Bootstrap)

## What you will find inside of the library
You will find all the source code, example folder with a template, javascript files, icon pack
You have everything to start a new Project

## How to use the Icons 
referr to [Bootstrap Icons Documentation](https://icons.getbootstrap.com/)

## Extended Functionality
if you want popper.js for extended functionality use this from jsdelivr
```
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>

```
## Mobile and SPA - OPA Web Application with React
just import in your react app this script and everything will work like a charm
Thanks to React Bootstrap Library and The Community follow the Instruction here [React Bootstrap Documentation](https://react-bootstrap.netlify.app/docs/getting-started/introduction)
```
<script
  src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>

```
but you can just copy and paste `example/index.php`

### this project uses Sass of course

Happy Coding
