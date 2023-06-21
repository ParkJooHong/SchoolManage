function insertDonation() {
  const donationName = document.querySelector("#donationName").value;
  const donationPrice = document.querySelector("#donationPrice").value;

  // 이름에 숫자 또는 특수 문자가 포함되어 있는지 확인
  if (/\d|\W/.test(donationName)) {
    Swal.fire({
      title: "경고",
      text: "이름은 문자만 입력해주세요!",
      icon: "warning",
    });
    return; // 함수 종료
  }

  // 가격이 숫자가 아닌 경우 확인
  if (isNaN(donationPrice)) {
    Swal.fire({
      title: "경고",
      text: "가격은 숫자를 입력해주세요!",
      icon: "warning",
    });
    return; // 함수 종료
  }

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

function selectDetail(donationCode) {
  $.ajax({
    url: "/stuMenu/donationDetailAjax", //요청경로
    type: "post",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    data: { donationCode: donationCode }, //필요한 데이터
    success: function (result) {
      console.log(result);
      // 상품명을 출력할 요소 선택
      const donationNameDetailElement =
        document.getElementById("donationNameDetail");

      const donationPriceDetailElement = document.getElementById(
        "donationPriceDetail"
      );

      const donationContentDetailElement = document.getElementById(
        "donationContentDetail"
      );

      const donationImageDetailElement = document.getElementById(
        "donationImageDetail"
      );

      let donationName_str = "";
      let donationPrice_str = "";
      let donationContent_str = "";
      let donationImage_str = "";

      donationName_str += result["donationDetail"].donationName;
      donationPrice_str += result["donationDetail"].donationPrice;
      donationContent_str += result["donationDetail"].donationContent;
      donationImage_str += `<img src="/image/donation/${result["donationDetail"].donationBoardImageVO.attachedFileName}" style="width: 200px; height: 250px;">`;

      // 상품명을 출력할 요소의 내용을 설정
      donationNameDetailElement.innerHTML = donationName_str;
      donationPriceDetailElement.innerHTML = donationPrice_str;
      donationContentDetailElement.innerHTML = donationContent_str;
      donationImageDetailElement.innerHTML = donationImage_str;
    },
    error: function () {
      alert("실패");
    },
  });
}
