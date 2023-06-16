

function insertDonation() {
	const donation_form = document.querySelector('#donationForm');
	const form_data = new FormData(donation_form);
  
	Swal.fire({
	  title: "등록 성공",
	  text: "중고품이 성공적으로 등록되었습니다.",
	  icon: 'success'
	});
  
	fetch('/donation/regDonation', {
	  method: 'POST',
	  body: form_data
	})
	  .catch(error => {
		console.error('Error: ', error);
	  });
  }