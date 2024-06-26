let index = {
	init: function() {
		$("#btn-save").on("click", () => { // function(){}이 아닌 ()=>{} 화살표 함수를 사용하는 이유: this를 바인딩하기 위해
			this.save();
		});
		$("#btn-update").on("click", () => { 
			this.update();
		});
	},

	save: function() {
		// alert("user의 save 함수 호출됨");
		let data = {
			username: $("#username").val(),
			password: $("#password").val(),
			email: $("#email").val(),
		};

		//console.log(data);

		// ajax 호출 시 default가 비동기 호출
		// ajax 통신을 이용하여 3개의 데이터를 json으로 변경하여 insert 요청
		// ajax가 통신을 성공하고 서버가 json을 리턴해주면 datatype를 작성하지 않아도 자동으로 자바 오브젝트로 변환해준다.
		$.ajax({
			type: "POST",
			url: "/auth/joinProc",
			data: JSON.stringify(data), // http body 데이터
			contentType: "application/json; charset = utf-8", // body 데이터가 어떤 타입인지(MIME)
			dataType: "json" // 서버로 요청을 해서 응답이 왔을 때, 기본적으로 모든 것이 문자열이다. 그러나 json의 형태를 가지고 있으면 javascript 오브젝트로 변경
		}).done(function(resp) {
			if(resp.status === 500){
				alert("회원가입 실패");
			}
			else{
				alert("회원가입 완료");
				location.href = "/";
			}
			
		}).fail(function(error) {
			alert(JSON.stringify(error));
		});
	},
	
	update: function() {
		let data = {
			id: $("#id").val(),
			password: $("#password").val(),
			email: $("#email").val()
		};

		$.ajax({
			type: "PUT",
			url: "/user",
			data: JSON.stringify(data), 
			contentType: "application/json; charset = utf-8", 
			dataType: "json" 
		}).done(function(resp) {
			alert("회원정보수정 완료");
			location.href = "/";
		}).fail(function(error) {
			alert(JSON.stringify(error));

		});
	},
}

index.init();