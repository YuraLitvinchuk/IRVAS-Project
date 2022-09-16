import checkNumInputs from "./checkNumIputs";

const forms = (state) => {
  const form = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input");

  checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  const postData = async (url, data) => {
    document.querySelector(".status").textContent = message.loading;
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach((e) => {
      e.value = "";
    });
  };

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMeassage = document.createElement("div");
      statusMeassage.classList.add("status");
      item.appendChild(statusMeassage);

      const formData = new FormData(item);
      if (item.getAttribute("data-calc") === "end") {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }
      postData("assets/server.php", formData)
        .then((res) => {
          console.log(res);
          statusMeassage.textContent = message.success;
        })
        .catch(() => {
          statusMeassage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMeassage.remove();
          }, 5000);
        });
    });
  });
};

export default forms;
