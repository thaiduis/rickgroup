document.addEventListener('DOMContentLoaded', function() {
  var popup = document.getElementById('popup');
  var closeBtn = document.getElementById('closePopup');
  var scrollBtn = document.getElementById('scrollTopBtn');

  // Hiện popup khi vào trang
  popup.style.display = 'flex';

  // Đóng popup khi bấm X
  closeBtn.onclick = function() {
    popup.style.display = 'none';
  };

  // Đóng popup khi click ra ngoài nội dung
  window.onclick = function(event) {
    if (event.target === popup) {
      popup.style.display = 'none';
    }
  };

  // Đóng popup khi bấm phím ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      popup.style.display = 'none';
    }
  });

  // Nút cuộn lên đầu trang
  window.onscroll = function() {
    if (window.scrollY > 200) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  };
  scrollBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hiệu ứng fade-in khi cuộn tới
  function revealOnScroll() {
    var fadeEls = document.querySelectorAll('.fade-in');
    var windowHeight = window.innerHeight;
    fadeEls.forEach(function(el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 40) {
        el.style.animationPlayState = 'running';
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Popup đặt chỗ online
  var bookingPopup = document.getElementById('bookingPopup');
  var closeBooking = document.getElementById('closeBookingPopup');
  var bookingBtns = document.querySelectorAll('.open-booking');
  var bookingService = document.getElementById('bookingService');
  var bookingForm = document.getElementById('bookingForm');
  var bookingSuccess = document.getElementById('bookingSuccess');

  bookingBtns.forEach(function(btn) {
    btn.onclick = function(e) {
      e.preventDefault();
      bookingPopup.classList.add('open');
      if (btn.dataset.service) {
        bookingService.value = btn.dataset.service;
      }
      bookingSuccess.style.display = 'none';
      bookingForm.style.display = 'block';
    };
  });
  if (closeBooking && bookingPopup) {
    closeBooking.onclick = function() {
      bookingPopup.classList.remove('open');
    };
    window.addEventListener('click', function(event) {
      if (event.target === bookingPopup) {
        bookingPopup.classList.remove('open');
      }
    });
  }
  bookingForm.onsubmit = function(e) {
    e.preventDefault();
    bookingForm.style.display = 'none';
    bookingSuccess.style.display = 'block';
    setTimeout(function() {
      bookingPopup.classList.remove('open');
    }, 2000);
  };

  // Popup chi tiết dịch vụ
  var serviceDetailPopup = document.getElementById('serviceDetailPopup');
  var closeServiceDetail = document.getElementById('closeServiceDetail');
  var detailBtns = document.querySelectorAll('.open-detail');
  var serviceDetailBody = document.getElementById('serviceDetailBody');

  var serviceDetails = {
    'PS5': `
      <h2>PS5</h2>
      <img src="images/ps5-demo.jpg" alt="PS5">
      <table class="detail-table">
        <tr><th>Giá</th><td>30.000 VNĐ/giờ</td></tr>
        <tr><th>Màn hình</th><td>4K 55”</td></tr>
        <tr><th>Tay cầm</th><td>2 DualSense</td></tr>
        <tr><th>Âm thanh</th><td>Vòm, phòng lạnh</td></tr>
      </table>
      <ul>
        <li>Chơi game console thế hệ mới, nước uống miễn phí, wifi mạnh.</li>
        <li>Hỗ trợ nhiều tựa game hot: FIFA, God of War, Spider-Man...</li>
      </ul>
      <div class="faq"><b>FAQ:</b> Có cần đặt trước không? <br>→ Nên đặt trước để giữ máy!</div>
      <div class="review">“Máy mới, phòng đẹp, trải nghiệm cực đã!”</div>
    `,
    'NET (PC)': `
      <h2>NET (PC)</h2>
      <img src="images/net-demo.jpg" alt="NET PC">
      <table class="detail-table">
        <tr><th>Giá</th><td>10.000 VNĐ/giờ</td></tr>
        <tr><th>Cấu hình</th><td>CPU i7, RAM 32GB</td></tr>
        <tr><th>Màn hình</th><td>240Hz 27”</td></tr>
        <tr><th>Ghế</th><td>Gaming, tai nghe xịn</td></tr>
      </table>
      <ul>
        <li>Dàn máy cấu hình cao, phòng lạnh, nước uống miễn phí, wifi cực mạnh.</li>
        <li>Hỗ trợ nhiều game hot: Valorant, LoL, CS:GO...</li>
      </ul>
      <div class="faq"><b>FAQ:</b> Có phòng riêng không? <br>→ Có, liên hệ để đặt phòng VIP.</div>
      <div class="review">“PC mạnh, màn hình nét, chơi game cực mượt!”</div>
    `,
    'Combo PS5 + NET': `
      <h2>Combo PS5 + NET</h2>
      <img src="images/combo-demo.jpg" alt="Combo">
      <table class="detail-table">
        <tr><th>Giá</th><td>35.000 VNĐ/giờ</td></tr>
        <tr><th>Ưu đãi</th><td>Chuyển đổi linh hoạt, tặng thêm giờ</td></tr>
      </table>
      <ul>
        <li>Trải nghiệm cả PS5 và PC, tiết kiệm chi phí, nhiều ưu đãi hấp dẫn.</li>
      </ul>
      <div class="faq"><b>FAQ:</b> Có thể chuyển đổi giữa PS5 và PC trong 1 lần đặt không? <br>→ Được, chỉ cần báo nhân viên!</div>
      <div class="review">“Combo tiện lợi, giá tốt, chơi cả ngày không chán!”</div>
    `
  };

  detailBtns.forEach(function(btn) {
    btn.onclick = function(e) {
      e.preventDefault();
      var service = btn.dataset.service;
      serviceDetailBody.innerHTML = serviceDetails[service] || '<p>Đang cập nhật...</p>';
      serviceDetailPopup.classList.add('open');
    };
  });
  if (closeServiceDetail && serviceDetailPopup) {
    closeServiceDetail.onclick = function() {
      serviceDetailPopup.classList.remove('open');
    };
    window.addEventListener('click', function(event) {
      if (event.target === serviceDetailPopup) {
        serviceDetailPopup.classList.remove('open');
      }
    });
  }

  // Popup đánh giá dịch vụ
  var reviewPopup = document.getElementById('reviewPopup');
  var closeReview = document.getElementById('closeReviewPopup');
  var reviewBtns = document.querySelectorAll('.open-review');
  var reviewService = document.getElementById('reviewService');
  var reviewForm = document.getElementById('reviewForm');
  var reviewSuccess = document.getElementById('reviewSuccess');

  reviewBtns.forEach(function(btn) {
    btn.onclick = function(e) {
      e.preventDefault();
      reviewPopup.classList.add('open');
      if (btn.dataset.service) {
        reviewService.value = btn.dataset.service;
      }
      reviewSuccess.style.display = 'none';
      reviewForm.style.display = 'block';
      reviewForm.reset();
    };
  });
  if (closeReview && reviewPopup) {
    closeReview.onclick = function() {
      reviewPopup.classList.remove('open');
    };
    window.addEventListener('click', function(event) {
      if (event.target === reviewPopup) {
        reviewPopup.classList.remove('open');
      }
    });
  }
  reviewForm.onsubmit = function(e) {
    e.preventDefault();
    var service = reviewService.value;
    var star = reviewForm.star.value || 5;
    var comment = reviewForm.comment.value;
    var reviewList = document.querySelector('.review-list[data-service="' + service + '"]');
    if (reviewList) {
      var starStr = '★★★★★☆☆☆☆☆'.slice(5-star, 10-star);
      var div = document.createElement('div');
      div.className = 'review-item';
      div.innerHTML = '<span class="review-stars">' + starStr + '</span> ' + comment;
      reviewList.insertBefore(div, reviewList.firstChild);
    }
    reviewForm.style.display = 'none';
    reviewSuccess.style.display = 'block';
    setTimeout(function() {
      reviewPopup.classList.remove('open');
    }, 2000);
  };

  // Countdown cho CTKM
  function updateCountdowns() {
    var countdowns = document.querySelectorAll('.promo-countdown');
    countdowns.forEach(function(el) {
      var end = el.dataset.end;
      if (!end) return;
      var endTime = new Date(end).getTime();
      var now = Date.now();
      var diff = endTime - now;
      if (diff <= 0) {
        el.textContent = 'Đã hết hạn';
        el.style.background = '#333';
        el.style.color = '#aaa';
        return;
      }
      var d = Math.floor(diff / (1000*60*60*24));
      var h = Math.floor((diff / (1000*60*60)) % 24);
      var m = Math.floor((diff / (1000*60)) % 60);
      var s = Math.floor((diff / 1000) % 60);
      el.textContent = (d > 0 ? d+' ngày ' : '') + (h < 10 ? '0'+h : h) + ':' + (m < 10 ? '0'+m : m) + ':' + (s < 10 ? '0'+s : s);
    });
  }
  setInterval(updateCountdowns, 1000);
  updateCountdowns();

  // Hiển thị mô tả combo khi chọn
  var bookingCombo = document.getElementById('bookingCombo');
  var comboInfo = document.getElementById('comboInfo');
  if (bookingCombo && comboInfo) {
    var comboDesc = {
      'PS5 + Nước': 'Chơi PS5 kèm nước uống miễn phí, giá chỉ 35.000 VNĐ/giờ.',
      'NET + Đồ ăn nhẹ': 'Chơi NET (PC) kèm đồ ăn nhẹ, giá chỉ 15.000 VNĐ/giờ.',
      'Combo Full': 'Trọn gói PS5 + NET + nước + đồ ăn, giá ưu đãi 45.000 VNĐ/giờ.',
      '': ''
    };
    bookingCombo.onchange = function() {
      comboInfo.textContent = comboDesc[bookingCombo.value] || '';
    };
    comboInfo.textContent = comboDesc[bookingCombo.value] || '';
  }

  // Countdown cho sự kiện
  function updateEventCountdowns() {
    var countdowns = document.querySelectorAll('.event-countdown');
    countdowns.forEach(function(el) {
      var end = el.dataset.end;
      if (!end) return;
      var endTime = new Date(end).getTime();
      var now = Date.now();
      var diff = endTime - now;
      if (diff <= 0) {
        el.textContent = 'Đã diễn ra';
        el.style.background = '#333';
        el.style.color = '#aaa';
        return;
      }
      var d = Math.floor(diff / (1000*60*60*24));
      var h = Math.floor((diff / (1000*60*60)) % 24);
      var m = Math.floor((diff / (1000*60)) % 60);
      var s = Math.floor((diff / 1000) % 60);
      el.textContent = (d > 0 ? d+' ngày ' : '') + (h < 10 ? '0'+h : h) + ':' + (m < 10 ? '0'+m : m) + ':' + (s < 10 ? '0'+s : s);
    });
  }
  setInterval(updateEventCountdowns, 1000);
  updateEventCountdowns();

  // Popup đăng ký sự kiện
  var eventRegisterPopup = document.getElementById('eventRegisterPopup');
  var closeEventRegister = document.getElementById('closeEventRegister');
  var eventRegisterBtns = document.querySelectorAll('.open-event-register');
  var eventRegisterName = document.getElementById('eventRegisterName');
  var eventRegisterForm = document.getElementById('eventRegisterForm');
  var eventRegisterSuccess = document.getElementById('eventRegisterSuccess');

  eventRegisterBtns.forEach(function(btn) {
    btn.onclick = function(e) {
      e.preventDefault();
      eventRegisterPopup.classList.add('open');
      if (btn.dataset.event) {
        eventRegisterName.value = btn.dataset.event;
      }
      eventRegisterSuccess.style.display = 'none';
      eventRegisterForm.style.display = 'block';
      eventRegisterForm.reset();
    };
  });
  if (closeEventRegister && eventRegisterPopup) {
    closeEventRegister.onclick = function() {
      eventRegisterPopup.classList.remove('open');
    };
    window.addEventListener('click', function(event) {
      if (event.target === eventRegisterPopup) {
        eventRegisterPopup.classList.remove('open');
      }
    });
  }
  if (eventRegisterForm && eventRegisterSuccess && eventRegisterPopup) {
    eventRegisterForm.onsubmit = function(e) {
      e.preventDefault();
      eventRegisterForm.style.display = 'none';
      eventRegisterSuccess.style.display = 'block';
      setTimeout(function() {
        eventRegisterPopup.classList.remove('open');
      }, 2000);
    };
  }
}); 