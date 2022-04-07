(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=new(function(){function t(e){var n=e.baseUrl,r=e.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=n,this._headers=r}var n,r;return n=t,(r=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getUserInfo",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{method:"GET",headers:this._headers}).then(this._checkResponse)}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{method:"GET",headers:this._headers}).then(this._checkResponse)}},{key:"editProfileData",value:function(e,t){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then(this._checkResponse)}},{key:"postNewCard",value:function(e,t){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then(this._checkResponse)}},{key:"getLikes",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{method:"GET",headers:this._headers}).then(this._checkResponse)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"putLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"deleteLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"patchAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._checkResponse)}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-38",headers:{authorization:"d858efb2-1413-409e-a417-bed1a584b8e7","Content-Type":"application/json"}});function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o=function(){function e(t,n){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r(this,"_showInputError",(function(e,t){var n=o._settings,r=n.inputErrorClass,i=n.errorClass,c=o._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(r),c.textContent=t,c.classList.add(i)})),r(this,"_hideInputError",(function(e){var t=o._settings,n=t.inputErrorClass,r=t.errorClass,i=o._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(n),i.classList.remove(r),i.textContent=""})),r(this,"checkValidity",(function(){o._toggleButtonState(),o._inputList.forEach((function(e){o._hideInputError(e)}))})),r(this,"_checkInputValidity",(function(e){e.validity.valid?o._hideInputError(e):o._showInputError(e,e.validationMessage)})),r(this,"_hasInvalidInput",(function(){return o._inputList.some((function(e){return!e.validity.valid}))})),r(this,"_toggleButtonState",(function(){var e=o._settings.inactiveButtonClass;o._hasInvalidInput()?(o._buttonElement.classList.add(e),o._buttonElement.disabled=!0):(o._buttonElement.classList.remove(e),o._buttonElement.disabled=!1)})),this._formElement=n,this._settings=t;var i=this._settings,c=i.inputSelector,a=i.submitButtonSelector;this._inputList=Array.from(this._formElement.querySelectorAll(c)),this._buttonElement=this._formElement.querySelector(a)}var t,o;return t=e,(o=[{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}])&&n(t.prototype,o),Object.defineProperty(t,"prototype",{writable:!1}),e}(),i={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},c=(document.querySelector(".popup__close-btn"),document.querySelector(".popup_modal")),a=(c.querySelector(".popup__close-btn"),c.querySelector(".popup__image-modal"),c.querySelector(".popup__title-modal"),document.querySelector(".profile__name"),document.querySelector(".profile__job"),document.querySelector(".profile__edit-button")),l=document.querySelector(".popup_profile"),u=(l.querySelector(".popup__close-btn"),l.querySelector(".popup__form"),l.querySelector(".popup__input_type_name")),s=l.querySelector(".popup__input_type_job"),f=document.querySelector(".profile__add-button"),p=document.querySelector(".elements-container"),h=document.querySelector(".popup_cards"),_=(h.querySelector(".popup__close-btn"),h.querySelector(".popup__form")),d=(h.querySelector(".popup__button"),document.querySelector(".popup__input_type_nameimage"),document.querySelector(".popup__input_type_image"),document.querySelector(".profile__avatar"),document.querySelector(".popup_avatar")),y=document.querySelector(".profile__avatar-button"),m=(d.querySelector(".popup__input_type_avatar"),document.querySelector(".element__trash"),document.querySelector(".popup_delete"));function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var g=function(){function e(t,n,r,o,i){var c=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),v(this,"isLiked",(function(){return c._likes.find((function(e){return e._id===c._userId}))})),v(this,"setLikes",(function(e){c._likes=e,c._likeCountElement.textContent=c._likes.length,c.isLiked()?c._handleLikeIcon():c._handleDislikeIcon()})),v(this,"_handleLikeIcon",(function(){c._elementLike.classList.add("element__like_active")})),v(this,"_handleDislikeIcon",(function(){c._elementLike.classList.remove("element__like_active")})),this._name=t.name,this._link=t.link,this._likes=t.likes,this._id=t.id,this._userId=t.userId,this._ownerId=t.ownerId,this._card=n,this._handleCardClick=r,this._handleLikeClick=o,this._handleDeleteClick=i}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._card).content.querySelector(".element").cloneNode(!0)}},{key:"createCard",value:function(){return this._element=this._getTemplate(),this._elementLike=this._element.querySelector(".element__like"),this._elementTrash=this._element.querySelector(".element__trash"),this._elementImage=this._element.querySelector(".element__image"),this._elementTitle=this._element.querySelector(".element__title"),this._likeCountElement=this._element.querySelector(".element__numberLike"),this._fillCard(),this._setEventListeners(),this.setLikes(this._likes),this._ownerId!==this._userId&&(this._elementTrash.style.display="none"),this._element}},{key:"_fillCard",value:function(){this._elementTitle.textContent=this._name,this._elementImage.src=this._link,this._elementImage.alt=this._name}},{key:"_setEventListeners",value:function(){var e=this;this._elementLike.addEventListener("click",(function(){e._handleLikeClick(e._id)})),this._elementTrash.addEventListener("click",(function(){e._handleDeleteClick(e._id)})),this._elementImage.addEventListener("click",(function(){e._handleCardClick(e._name,e._link)}))}},{key:"deleteCard",value:function(){this._element.remove(),this._element=null}}])&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var S=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),w(this,"_handleEscClose",(function(e){"Escape"===e.key&&n.close()})),w(this,"_handleOverlayAndClickClose",(function(e){(e.target.classList.contains("popup_active")||e.target.classList.contains("popup__close-btn"))&&n.close()})),this._popup=t}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_active"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_active"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){this._popup.addEventListener("mousedown",this._handleOverlayAndClickClose)}}])&&k(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function E(e){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},E(e)}function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function L(e,t){return L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},L(e,t)}function C(e,t){if(t&&("object"===E(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return j(e)}function j(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function P(){return P="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=I(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},P.apply(this,arguments)}function I(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=q(e)););return e}function q(e){return q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},q(e)}function R(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var T=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&L(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=q(r);if(o){var n=q(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return C(this,e)});function c(e,t){var n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),R(j(r=i.call(this,e)),"getInputValues",(function(){return r._inputList.forEach((function(e){r._formValues[e.name]=e.value})),r._formValues})),R(j(r),"close",(function(){P((n=j(r),q(c.prototype)),"close",n).call(n),r._form.reset()})),r._submitCallbackForm=t,r._form=r._popup.querySelector(".popup__form"),r._inputList=r._form.querySelectorAll(".popup__input"),r._formValues={},r._submitButton=r._form.querySelector(".popup__button"),r}return t=c,(n=[{key:"renderLoading",value:function(e,t){this._submitButton.textContent=!0===e?"Сохранение...":t}},{key:"setEventListeners",value:function(){var e=this;P(q(c.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault();var n=e.getInputValues();e._submitCallbackForm(n)}))}}])&&O(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),c}(S);function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function A(e,t,n){return t&&U(e.prototype,t),n&&U(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function x(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var B=A((function e(t){var n=this,r=t.selectorName,o=t.selectorJob,i=t.selectorAvatar,c=t._id;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),x(this,"getUserInfo",(function(){return{selName:n._profileName.textContent,selJob:n._profileJob.textContent,selAvatar:n._profileAvatar.src,_id:n._userId}})),x(this,"setUserInfo",(function(e){var t=e.name,r=e.about,o=e.avatar,i=e._id;n._profileName.textContent=t,n._profileJob.textContent=r,n._profileAvatar.src=o,n._userId=i})),this._profileName=document.querySelector(r),this._profileJob=document.querySelector(o),this._profileAvatar=document.querySelector(i),this._userId=c}));function D(e){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D(e)}function V(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function N(){return N="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=J(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},N.apply(this,arguments)}function J(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=F(e)););return e}function H(e,t){return H=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},H(e,t)}function G(e,t){if(t&&("object"===D(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function F(e){return F=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},F(e)}var M=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&H(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=F(r);if(o){var n=F(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return G(this,e)});function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,e))._image=t._popup.querySelector(".popup__image-modal"),t._title=t._popup.querySelector(".popup__title-modal"),t}return t=c,(n=[{key:"open",value:function(e,t){this._image.src=e,this._image.alt=t,this._title.textContent=t,N(F(c.prototype),"open",this).call(this)}}])&&V(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),c}(S);function z(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function $(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var K=function(){function e(t,n){var r=this,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),$(this,"addItem",(function(e){r._elementsContainer.append(e)})),$(this,"prependItem",(function(e){r._elementsContainer.prepend(e)})),this._renderer=o,this._elementsContainer=n}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}}])&&z(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function Q(e){return Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Q(e)}function W(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function X(){return X="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=Y(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},X.apply(this,arguments)}function Y(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=te(e)););return e}function Z(e,t){return Z=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},Z(e,t)}function ee(e,t){if(t&&("object"===Q(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function te(e){return te=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},te(e)}var ne=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&Z(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=te(r);if(o){var n=te(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return ee(this,e)});function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,e))._popupSubmit=t._popup.querySelector(".popup__button_delete"),t}return t=c,(n=[{key:"changeSubmit",value:function(e){this._submitHandler=e}},{key:"setEventListeners",value:function(){var e=this;X(te(c.prototype),"setEventListeners",this).call(this),this._popupSubmit.addEventListener("click",(function(){e._submitHandler()}))}}])&&W(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),c}(S);function re(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var oe,ie=new o(i,_),ce=new o(i,l),ae=new o(i,d),le=new T(l,(function(e){le.renderLoading(!0);var n=e.name,r=e.job;t.editProfileData(n,r).then((function(e){pe.setUserInfo(e),le.close()})).catch((function(e){console.log(e)})).finally((function(){console.log("сохранение"),le.renderLoading(!1,"Сохранить")}))})),ue=new T(d,(function(e){ue.renderLoading(!0);var n=e.avatar;t.patchAvatar(n).then((function(e){console.log(e),pe.setUserInfo(e),ue.close()})).catch((function(e){console.log(e)})).finally((function(){console.log("сохранение"),ue.renderLoading(!1,"Сохранить")}))})),se=new M(c),fe=new ne(m),pe=new B({selectorName:".profile__name",selectorJob:".profile__job",selectorAvatar:".profile__avatar"});Promise.all([t.getUserInfo(),t.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],c=!0,a=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);c=!0);}catch(e){a=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(a)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return re(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?re(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];pe.setUserInfo(o),oe=o._id,console.log(o._id),_e.renderItems(i)})).catch((function(e){console.log(e)})),a.addEventListener("click",(function(){var e=pe.getUserInfo();u.value=e.selName,s.value=e.selJob,le.open(),ce.checkValidity()})),y.addEventListener("click",(function(){ue.open(),ae.checkValidity()}));var he=function(e){var n=new g({name:e.name,link:e.link,likes:e.likes,id:e._id,userId:oe,ownerId:e.owner._id},"#add-picture-template",(function(){se.open(e.link,e.name)}),(function(e){console.log("clicked like"),console.log("Айдишник лайкнутой картинки: ".concat(e)),n.isLiked()?t.deleteLike(e).then((function(e){n.setLikes(e.likes)})).catch((function(e){console.log(e)})):t.putLike(e).then((function(e){n.setLikes(e.likes)})).catch((function(e){console.log(e)}))}),(function(e){console.log("clicked button trash"),console.log("Айдишник карточки: ".concat(e)),fe.open(),fe.changeSubmit((function(){t.deleteCard(e).then((function(e){console.log("yes"),console.log(e),n.deleteCard(),fe.close()})).catch((function(e){console.log(e)}))}))}));return n.createCard()},_e=new K({renderer:function(e){_e.addItem(he(e))}},p),de=new T(h,(function(e){de.renderLoading(!0),t.postNewCard(e.name,e.image).then((function(t){console.log(e);var n=he(t);_e.prependItem(n),de.close()})).catch((function(e){console.log(e)})).finally((function(){console.log("сохранение"),de.renderLoading(!1,"Создать")}))}));f.addEventListener("click",(function(){ie.checkValidity(),de.open()})),ie.enableValidation(),ce.enableValidation(),ae.enableValidation(),le.setEventListeners(),ue.setEventListeners(),se.setEventListeners(),de.setEventListeners(),fe.setEventListeners()})();