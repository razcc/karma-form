const contactForm = document.querySelector(".contact-form")

var nameInut = document.getElementById("fname")
var email = document.getElementById("email")
var message = document.getElementById("message")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  let formData = {
    names: nameInut.value,
    emailValue: email.value,
    message: message.value,
  }

  let xhr = new XMLHttpRequest()

  xhr.open("POST", "/")

  xhr.setRequestHeader("content-type", "application/json")

  xhr.onload = function () {
    console.log(xhr.responseText)

    if (xhr.responseText) {
      alert("Sent")
      nameInut.value = ""
      email.value = ""
      message.value = ""
    } else {
      alert("something wrong")
    }
  }
  console.log("Sending request...")
  xhr.send(JSON.stringify(formData))
})
