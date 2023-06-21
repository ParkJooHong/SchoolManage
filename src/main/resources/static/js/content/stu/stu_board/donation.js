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

const donationButtons = document.querySelectorAll(".donation");
donationButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const donationCode = document.querySelector("#donationCode").value;
    // 서버로 AJAX 요청 보내기
    fetch("/stuMenu/donationdetail?donationCode=" + donationCode)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then(function (data) {
        // 모달에 데이터 채워넣기
        const productName = document.getElementById("product-name");
        const productPrice = document.getElementById("product-price");
        const productDescription = document.getElementById(
          "product-description"
        );

        productName.innerText = "상품명: " + data.donationName;
        productPrice.innerText = "상품가격: " + data.donationPrice;
        productDescription.innerText = data.donationContent;

        // 모달 열기
        const modal = new bootstrap.Modal(
          document.getElementById("donationDetailModal")
        );
        modal.show();
      })
      .catch(function (error) {
        console.log(error);
      });
  });
});
