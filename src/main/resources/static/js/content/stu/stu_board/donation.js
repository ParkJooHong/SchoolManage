function insertDonation() {
  const donation_form = document.querySelector("#donationForm");
  const form_data = new FormData(donation_form);

  Swal.fire({
    title: "등록 성공",
    text: "중고품이 성공적으로 등록되었습니다.",
    icon: "success",
  });

  fetch("/donation/regDonation", {
    method: "POST",
    body: form_data,
  }).catch((error) => {
    console.error("Error: ", error);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var donationSeeButtons = document.querySelectorAll(".donationDetail");
  donationSeeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var donationCode = button.getAttribute("data-donation-code");

      fetch("/stuMenu/donationdetail?donationCode=" + donationCode)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.status);
          }
        })
        .then(function (data) {
          // 받은 데이터를 사용하여 모달 열기 및 내용 업데이트 로직
        })
        .catch(function (error) {
          // 에러 처리 로직
          console.log(error);
        });
    });
  });
});
