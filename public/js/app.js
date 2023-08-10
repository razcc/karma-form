const contactForm = document.querySelector(".contact-form")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()
  var name = document.getElementById("name")
  var email = document.getElementById("email")
  var message = document.getElementById("message")

  let formData = {
    name: name.value,
    emailValue: email.value,
    message: message.value,
  }

  let xhr = new XMLHttpRequest()

  xhr.open("POST", "/")

  xhr.setRequestHeader("content-type", "application/json")

  xhr.onload = function () {
    console.log(xhr.responseText)

    if (xhr.responseText == "success") {
      alert("Message Sent")
      name.value = ""
      email.value = ""
      message.value = ""
    } else {
      alert("something wrong")
    }
  }

  xhr.send(JSON.stringify(formData))
})
