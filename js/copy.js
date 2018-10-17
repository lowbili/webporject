var valiDate = valiDate || {};
valiDate = {
	heardLoginValiDate: function() {
		if ($j(this).data("processing")) {
			return false
		}
		$j(this).data("processing", true);
		if ($j.trim($j("#loginName").val()) == "") {
			$j("#loginName").addClass("error");
			$j(this).data("processing", false);
			return false
		} else {
			if (checkEmailLengthAndvalidity($j("#loginName").val(), 50) || checkMobile($j.trim($j("#loginName").val()))) {
				$j("#loginName").removeClass("error")
			} else {
				if (!WidthCheck($j("#loginName").val(), 50)) {
					$j("#loginName").addClass("error");
					$j(this).data("processing", false);
					return
				} else {
					$j("#loginName").addClass("error");
					$j(this).data("processing", false);
					return false
				}
			}
		}
		$j("#loginName").removeClass("error");
		$j("#loginName").next().hide();
		if ($j.trim($j("#loginPWD").val()) == "") {
			$j("#loginPWD").addClass("error");
			$j(this).data("processing", false);
			return false
		}
		if ($j.trim($j("#loginPWD").val()).length < 6 || $j.trim($j("#loginPWD").val()).length > 12) {
			$j("#loginPWD").addClass("error");
			$j("#loginPWD").next().next().html("请输入有效密码！").show();
			$j(this).data("processing", false);
			return false
		}
		if (!checkPassword($j.trim($j("#loginPWD").val()))) {
			$j("#loginPWD").addClass("error");
			$j("#loginPWD").next().next().html("请输入有效密码！").show();
			$j(this).data("processing", false);
			return false
		}
		$j("#loginPWD").removeClass("error");
		$j("#loginPWD").next().next().html("").hide();
		return true
	},
	popUpRegisterValiDate: function() {
		var g = isEmailValid($j("#pop-email-reg")[0]);
		var c = isMobileValid($j("#pop-mobile-reg")[0]);
		var d = isPasswordValid($j("#pop-password-reg")[0]);
		var f = isPasswordAgainValidPOP($j("#pop-passwordAgain-reg")[0]);
		var a = isValidateCodeValid($j("#pop-validateCode-reg")[0]);
		var h = isGenderValidPOP();
		var e = isBirthdayValidPOP();
		var i = isValidateMobileCode($j("#pop-mobileCode-reg")[0]);
		var b = g && c && d && f && a && h && e && i && h;
		return b
	},
	heardRegisterValiDate: function() {
		var g = isEmailValid($j("#email-reg")[0]);
		var c = isMobileValid($j("#mobile-reg")[0]);
		var d = isPasswordValid($j("#password-reg")[0]);
		var f = isPasswordAgainValid($j("#passwordAgain-reg")[0]);
		var a = isValidateCodeValid($j("#validateCode-reg")[0]);
		var h = isGenderValid();
		var e = isBirthdayValid();
		var i = isValidateMobileCode($j("#validateMobile-reg")[0]);
		var b = g && c && d && f && a && h && e && i;
		return b
	},
	bindMobileValiDate: function() {
		return true
	},
	forgetPassWordValiDate: function() {
		return true
	}
};

function WidthCheck(d, f) {
	var a = 0;
	for (var b = 0; b < d.length; b++) {
		var e = d.charCodeAt(b);
		if ((e >= 1 && e <= 126) || (65376 <= e && e <= 65439)) {
			a++
		} else {
			a += 2
		}
	}
	if (a > f) {
		return false
	}
	return true
}

function checkEmailLengthAndvalidity(a, b) {
	return checkEmail($j.trim($j("#loginName").val())) && WidthCheck(a, b)
}

function checkEmail(c) {
	var d = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return d.test(c.replace(/(^\s*)|(\s*$)/g, ""))
}

function checkMobile(a) {
	var b = /^(1[3-9]{1}[0-9]{1})\d{8}$/;
	return b.test(a)
}

function checkPassword(a) {
	var b = /[^\x00-\xff]/;
	return !b.test(a)
}

function login() {
	if ($j(this).data("processing")) {
		return
	}
	$j(this).data("processing", true);
	if ($j.trim($j("#loginName").val()) == "") {
		$j("#loginName").addClass("error");
		$j("#loginName").next().html("请输入登陆名！");
		$j(this).data("processing", false);
		return
	} else {
		if (checkEmailLengthAndvalidity($j("#loginName").val(), 50) || checkMobile($j.trim($j("#loginName").val()))) {
			$j("#loginName").removeClass("error")
		} else {
			if (!WidthCheck($j("#loginName").val(), 50)) {
				$j("#loginName").addClass("error");
				$j("#loginName").next().html("登陆名过长！");
				$j(this).data("processing", false);
				return
			} else {
				$j("#loginName").addClass("error");
				$j(this).data("processing", false);
				return
			}
		}
	}
	$j("#loginName").removeClass("error");
	$j("#loginName").next().hide();
	if ($j.trim($j("#loginPWD").val()) == "") {
		$j("#loginPWD").addClass("error");
		$j(this).data("processing", false);
		return
	}
	if ($j.trim($j("#loginPWD").val()).length < 6 || $j.trim($j("#loginPWD").val()).length > 12) {
		$j("#loginPWD").addClass("error");
		$j("#loginPWD").next().next().html("请输入有效密码！").show();
		$j(this).data("processing", false);
		return
	}
	if (!checkPassword($j.trim($j("#loginPWD").val()))) {
		$j("#loginPWD").addClass("error");
		$j("#loginPWD").next().next().html("请输入有效密码！").show();
		$j(this).data("processing", false);
		return
	}
	$j("#loginPWD").removeClass("error");
	$j("#loginPWD").next().next().html("").hide();
	if (($j("#loginName").val().indexOf("@iplabel.com") == -1) && ($j("#loginName").val().indexOf("3k@qq.com") == -1) && ($j("#loginName").val().indexOf("@bonree.com") == -1)) {
		if (!gt) {
			if ($j("#validateCode").val() != "") {
				var j = loxia.syncXhr($j("#validateCode").attr("checkurl"), {
					validatecode: $j.trim($j("#validateCode").val()),
					iId: $j.trim($j("#LBD_VCID_pc_login").val())
				});
				if (!j.result) {
					$j("#validateCode").addClass("error");
					$j("#validateCode").parent().find(".error").html("验证码错误！").show();
					$j(this).data("processing", false);
					changeCode("login");
					return
				}
			} else {
				$j("#validateCode").addClass("error");
				$j(this).data("processing", false);
				changeCode("login");
				return
			}
		} else {
			if (!$j("#challenge").val()) {
				$j("#heard-login-gt").parent().find(".error").html("请先进行验证！");
				$j(this).data("processing", false);
				return
			}
		}
	}
	var f = $j("#modulus").val();
	var e = $j("#exponent").val();
	var h = RSAUtils.getKeyPair(e, "", f);
	var i = RSAUtils.encryptedString(h, $j("#loginPWD").val());
	$j("#password").val(i);
	$j(".blackbg").css("z-index", "1000");
	var g = $j(".loading");
	if (g.length == 0) {
		g = $j('<div style="width:32px;height:32px;position:absolute;left:50%;margin-left:-16px;display:none;z-index:2000;"><img width="32" height="32" src="' + domain_image + '/images/commons/indicator_verybig.gif"/><div>');
		$j("body").append(g)
	}
	var b = parseInt($j(document).scrollTop());
	g.css("top", b + $j(window).height() / 2 + "px").show();
	loading = true;
	$j("#validateCode").removeClass("error");
	$j("#validateCode").next().next().html("").hide();
	var d = {
		LBD_VCID_pc_login: $j.trim($j("#LBD_VCID_pc_login").val())
	};
	d.loginName = $j("#loginName").val();
	d.password = $j("#password").val();
	d.validateCode = $j("#validateCode").val();
	d.rememberLoginName = $j(".keeplogin").hasClass("chosen");
	d.callbackBlogUrl = $j("#callbackUrl").val();
	var c = GEETEST.getValiDate();
	d.challenge = c.geetest_challenge;
	d.validate = c.geetest_validate;
	d.seccode = c.geetest_seccode;
	var a = $j(this);
	loxia.asyncXhrPost($j("#login-form").attr("action"), d, {
		success: function(k) {
			g.hide();
			loading = false;
			a.data("processing", false);
			if (k.status && k.status == "notvalidate") {
				g.hide();
				loading = false;
				$j(".blackbg").css("z-index", "auto");
				checkLogin2BindMobile();
				changeCode("mobile-auth");
				return
			}
			if (null != k.error) {
				if (k.error == "bindMobile") {
					$j("#mlname").val(k.mlname);
					bindMoibleToMember();
					changeCode("mobile-auth");
					return
				}
				if ("ValidateCodeError" == k.error) {
					if (gt) {
						$j("#heard-login-gt").find(".error").html("验证错误！");
						GEETEST.register(GEETEST.heardLoginCall)
					} else {
						$j("#validateCode").parent().find(".error").html("验证码错误！").show();
						changeCode("login")
					}
					$j(this).data("processing", false);
					return
				}
				if (gt) {
					GEETEST.register(GEETEST.heardLoginCall)
				} else {
					changeCode("login")
				}
				$j(".blackbg").css("z-index", "99");
				$j("#loginName").addClass("error");
				$j("#loginPWD").addClass("error");
				$j("#loginPWD").next().next().html("您输入的注册邮箱/手机与密码不匹配，请重新输入！").show();
				return
			}
			if (null != k.succeed) {
				if (null != k.backurl && 0 < k.backurl.length) {
					window.location.href = _contextPath + k.backurl
				}
				loginGridsum($j("#loginName").val(), null);
				reloadHead(k.memberCommand, k.listCommand, k.backurl);
				$j(".log-sign-button").trigger("click").parent().remove()
			}
		},
		error: function() {
			g.hide();
			loading = false;
			a.data("processing", false)
		}
	})
}

function showLoading() {
	$j(".blackbg").css("z-index", "1000");
	var a = $j(".loading");
	if (a.length == 0) {
		a = $j('<div class="loading" style="width:32px;height:32px;position:absolute;left:50%;margin-left:-16px;display:none;z-index:2000;"><img width="32" height="32" src="' + domain_image + '/images/commons/indicator_verybig.gif"/><div>');
		$j("body").append(a)
	}
	var b = parseInt($j(document).scrollTop());
	a.css("top", b + $j(window).height() / 2 + "px").show();
	loading = true
}

function closeLoading() {
	if (!$j(".loading")) {
		return
	}
	$j(".loading").hide();
	$j(".blackbg").css("z-index", "auto");
	loading = false
}

function bindMoibleToMember() {
	$j("#login-form").hide();
	$j("#bind-mobile-form").show();
	$j(".blackbg").css("z-index", "99");
	$this = $j("#authCode").next();
	$this.attr("src", $this.data("src"));
	changeCode("mobile-auth")
}

function changeCode(a) {
	if (a != "undefined" && "login" == a) {
		detectImgReload("pc_login")
	} else {
		if (a != "undefined" && "forget" == a) {
			detectImgReload("pc_forgetpass")
		} else {
			if (a != "undefined" && "mobile-auth" == a) {
				detectImgReload("pc_bindMobile")
			} else {
				return
			}
		}
	}
}

function resetPWDMobileBlur() {
	var a = $j("#mobile-reset");
	if ($j.trim(a.val()) == "") {
		a.addClass("error");
		a.next().next().html("您填写的手机号码有误，请重新输入！");
		return
	} else {
		if (!checkMobile($j.trim(a.val()))) {
			a.addClass("error");
			a.next().next().html("您填写的手机号码有误，请重新输入！").show();
			return
		}
	}
	a.removeClass("error");
	a.attr("checked", true);
	a.next().next().html("").hide()
}

function resetPWDEmailBlur() {
	var a = $j("#email-reset");
	a.attr("checked", false);
	if ($j.trim(a.val()) == "") {
		a.addClass("error");
		a.next().html("请输入有效的电子邮箱！").show();
		return
	} else {
		if (!checkEmail(a.val())) {
			a.addClass("error");
			a.next().next().html("请输入有效的电子邮箱！").show();
			return
		}
	}
	a.removeClass("error");
	a.attr("checked", true);
	a.next().html("").hide()
}
$j(document).ready(function() {
	$j(this).keydown(function(d) {
		if (d.which == "13") {
			if ($j(".top-login-btn").parents("form").css("display") == "block") {
				$j(".top-login-btn").click()
			}
		}
	});
	var b = window.location.pathname;
	if ("/newSendCoupons.htm" == b) {
		var a = loxia.syncXhrPost(_contextPath + "/newSendCoupons.json", {
			isSendConponUrl: true
		});
		if (a && !a.isLogin) {
			$j(".log-sign-button .log").trigger("click")
		} else {
			if (a && a.sendFlag == true) {
				sendActivity()
			}
		}
	}
	$j("body").on("click", ".top-login-btn", login);
	$j("#loginName").blur(function() {
		if ($j.trim($j(this).val()) == "") {
			$j(this).addClass("error");
			return
		} else {
			if (!WidthCheck($j(this).val(), 50)) {
				$j(this).addClass("error");
				$j(this).next().html("邮箱只可输入50个字符！").show();
				return
			}
			if (checkEmailLengthAndvalidity($j.trim($j(this).val(), 50)) || checkMobile($j.trim($j(this).val()))) {} else {
				$j(this).addClass("error");
				$j(this).next().html("请输入有效的电子邮箱/手机号码！").show();
				return
			}
		}
		$j(this).removeClass("error");
		$j(this).next().html("").hide()
	});
	$j("#loginPWD").blur(function() {
		if ($j.trim($j(this).val()) == "") {
			$j(this).addClass("error");
			return
		} else {
			if ($j.trim($j(this).val()).length < 6 || $j.trim($j(this).val()).length > 12) {
				$j(this).addClass("error");
				$j(this).next().next().html("密码必须在6-12个字符之间！").show();
				return
			}
			if (checkPassword($j.trim($j(this).val()))) {} else {
				$j(this).addClass("error");
				$j(this).next().next().html("请输入有效密码！").show();
				return
			}
		}
		$j(this).removeClass("error");
		$j(this).next().next().html("").hide()
	});
	$j("#validateCode").blur(function() {
		var e = $j(this),
			f = $j.trim(e.val()),
			d = e.next().next().next().next();
		if (f == "") {
			e.addClass("error");
			return
		}
		if (f.length != 4) {
			e.addClass("error");
			d.html("验证码需要4位字符！").show();
			return
		}
		e.removeClass("error");
		d.html("").hide()
	});
	$j(".keeplogin").click(function() {
		if ($j(".keeplogin").hasClass("chosen")) {
			$j(".keeplogin").removeClass("chosen")
		} else {
			$j(".keeplogin").addClass("chosen")
		}
	});
	$j("#email-reset").blur(function() {
		$j(this).attr("checked", false);
		if ($j.trim($j(this).val()) == "" || !checkEmail($j(this).val())) {
			$j(this).addClass("error");
			$j(this).next().html("请输入有效的电子邮箱！").show();
			return
		} else {
			if (!WidthCheck($j(this).val(), 50)) {
				$j(this).addClass("error");
				$j(this).next().html("邮箱只可输入50个字符！").show();
				return
			}
		}
		var d = loxia.syncXhrPost(_contextPath + "/member/valdateEmail.json", {
			email: $j.trim($j(this).val())
		});
		if (d && d.result == "0") {
			$j(this).addClass("error");
			$j(this).next().html("请输入有效的电子邮箱！").show();
			return
		} else {
			if (d && d.result == "2") {
				$j(this).addClass("error");
				$j(this).next().html("抱歉，联合登录的用户请到第三方找回密码！").show();
				return
			}
		}
		$j(this).removeClass("error");
		$j(this).attr("checked", true);
		$j(this).next().html("").hide()
	});
	$j("#verifycode-reset").blur(function() {
		$j(this).attr("checked", false);
		if ($j.trim($j(this).val()) == "") {
			$j(this).addClass("error");
			return
		}
		if ($j.trim($j(this).val()).length != 4) {
			$j(this).addClass("error");
			$j(this).next().next().html("您填写的验证码有误，请重新输入！").show();
			return
		}
		$j(this).removeClass("error");
		$j(this).attr("checked", true);
		$j(this).next().next().html("").hide()
	});
	$j("#mobile-reset, #email-reset").focus(function() {
		$j(this).removeClass("error");
		$j(this).attr("checked", true);
		$j(this).next().html("").hide()
	});
	var c = false;
	$j("#forget-password-btn").click(function() {
		console.log(c);
		if (!c) {
			c = true;
			$j("#verifycode-reset").trigger("blur");
			if ($j("#email-reset").attr("checked") && $j("#verifycode-reset").attr("checked")) {
				loxia.asyncXhrPost(_contextPath + "/member/forgetPassword.json", {
					email: $j.trim($j("#email-reset").val()),
					passwordAgain: $j("#verifycode-reset").val(),
					LBD_VCID_pc_forgetpass: $j("#LBD_VCID_pc_forgetpass").val()
				}, {
					success: function(d) {
						c = false;
						if (!d.success) {
							if (d.errorCode == "invalidSecurityCode") {
								$j("#verifycode-reset").addClass("error");
								$j("#verifycode-reset").next().next().html("验证码错误").show();
								changeCode("forget");
								return
							}
							if (d.errorCode == "errorEmail") {
								$j("#verifycode-reset").addClass("error");
								$j("#verifycode-reset").next().next().html("请输入有效的电子邮箱！").show();
								changeCode("forget");
								return
							}
							if (d.errorCode == "tooFrequent") {
								$j("#email-reset").addClass("error");
								$j("#email-reset").next().html("重置操作过于频繁，请稍候再操作").show();
								return
							}
							return
						}
						$j(".forget-password-form").remove();
						$j(".forget-password-success").removeClass("disabled")
					},
					error: function() {
						c = false
					}
				})
			} else {
				c = false;
				changeCode("forget");
				return
			}
		}
	});
	$j("#loginName, #loginPWD").one("change", function() {
		var d = $j.trim($j(this).val());
		if (d != "") {
			$j(this).next().hide()
		}
	});
	$j("#bind-mobile-form .send-mobile-desction").bind("click", function() {
		if (!$j($j("#login-send-mobile-code")[0]).data("btnClickFlag")) {
			if (!checkLoginHasErrors()) {
				return false
			} else {
				if (!checkMobile($j("#bindMobile").val())) {
					$j("#bindMobile").siblings(".error").html("手机号码格式错误").show();
					return false
				} else {
					$j("#bindMobile").siblings(".error").html("")
				}
			}
			if ($j(this).html() != "发送短信验证码") {
				return false
			}
			countDown.apply($j("#login-send-mobile-code")[0]);
			var d = $j("#bindMobile").val();
			a = loxia.syncXhrPost(_contextPath + "/member/sendSMSCode.json", {
				mobile: d,
				way: "bindmobile",
				ins: "bindmobile",
				scode: $j("#authCode").val(),
				LBD_VCID_pc_bindMobile: $j("#LBD_VCID_pc_bindMobile").val()
			});
			if (a && a.result) {
				$j("#mobileAuthCode").siblings(".error").html("短信发送成功").show()
			} else {
				if (a.mess) {
					$j("#mobileAuthCode").siblings(".error").html(a.mess).show()
				} else {
					$j("#mobileAuthCode").siblings(".error").html("发送短信失败，请稍后重试！").show()
				}
				resetCountDown()
			}
			changeCode("mobile-auth")
		}
	});
	$j("body").on("click", ".top-bind-mobile-btn", bindMobileToLogin);
	$j("#bindMobile").blur(function() {
		if (!checkMobile($j(this).val())) {
			$j(this).next().html("手机号码格式错误")
		} else {
			$j(this).next().html("")
		}
	});
	$j("#authCode").blur(function() {
		var d = $j(this).val();
		if (d && d.length != 4) {
			$j(this).siblings(".error").html("验证码为4位")
		} else {
			$j(this).siblings(".error").html("")
		}
	});
	$j("#new-password").blur(function() {
		resetPWDCheckNewPwd(this)
	});
	$j("#confirm-pwd").blur(function() {
		resetPWDCheckConfirmPwd(this)
	});
	$j("#verifycode-sms").blur(function() {
		resetPWDCheckValidateCode(this)
	});
	$j(".reset-password-btn").click(function() {
		if (($j("#new-password").attr("checked") || $j("#confirm-pwd").attr("checked")) && $j("#verifycode-sms").attr("checked")) {
			var f = $j("#modulus").val();
			var i = $j("#exponent").val();
			var h = RSAUtils.getKeyPair(i, "", f);
			var e = RSAUtils.encryptedString(h, $j("#new-password").val());
			var g = RSAUtils.encryptedString(h, $j("#confirm-pwd").val());
			var d = loxia.syncXhrPost(_contextPath + "/myshop/resetPassword.json", {
				newPwd: e,
				confirmPwd: g,
				smsCode: $j.trim($j("#verifycode-sms").val()),
				emailOrPhone: $j.trim($j("#reset-member-email").val())
			});
			if (d && d.flag == 1) {
				window.location.href = _contextPath + location.href
			} else {
				if (d && d.flag == 0) {
					$j("#verifycode-sms").next("验证码不正确")
				}
				return
			}
		}
	});
	initUnionLogin();
	if (window.redirect != "" && window.redirect) {
		var a = !isGuest;
		if (a) {
			window.location.href = encodeURI(window.redirect)
		} else {
			showMessage("请先登录", function() {
				$j(".log-sign-button .log").trigger("click")
			})
		}
	}
});

function checkLoginHasErrors() {
	var a = true;
	$j(".login-content input").each(function() {
		if ($j(this).hasClass("error")) {
			a = false
		}
	});
	return a
}

function bindMobileToLogin() {
	var c = $j("#mlname").val();
	var b = $j("#bindMobile").val();
	var d = $j("#mobileAuthCode").val();
	if (!d) {
		if (result.error) {
			$j("#login-send-mobile-code").siblings(".error").html(result.error).show()
		} else {
			$j("#login-send-mobile-code").siblings(".error").html("手机短信验证码不正确").show()
		}
		return
	} else {
		$j("#login-send-mobile-code").siblings(".error").html("")
	}
	var a = $j("#bind-mobile-form").attr("action");
	showLoading();
	loxia.asyncXhrPost(a, {
		loginName: c,
		mobile: b,
		smsCode: d,
		callBackUrl: "",
		sercuitycode: $j("#authCode").val(),
		LBD_VCID_pc_bindMobile: $j("#LBD_VCID_pc_bindMobile").val()
	}, {
		success: function(e) {
			if (e.result) {
				$j("#mobileAuthCode").siblings(".error").html("");
				reloadHead(e.memberCommand, e.listCommand, e.paymentUrl);
				$j(".log-sign-button").trigger("click").parent().remove();
				closeLoading();
				if (e.backurl && e.backurl.length > 0) {
					window.location.href = _contextPath + e.backurl
				}
			} else {
				$j("#mobileAuthCode").siblings(".error").html(e.smsError).show();
				detectImgReload("pc_bindMobile");
				closeLoading()
			}
		},
		error: function() {
			detectImgReload("pc_bindMobile");
			closeLoading();
			$j("#mobileAuthCode").siblings(".error").html("系统异常").show()
		}
	})
}

function resetPWDCheckNewPwd(a) {
	$j(a).attr("checked", false);
	$j(a).addClass("error");
	if ($j.trim($j(a).val()) == "") {
		return
	}
	if ($j.trim($j(a).val()).length < 6 || $j.trim($j(a).val()).length > 12) {
		$j(a).next().html("请输入长度6-12位的有效密码！").show();
		return
	}
	if (!checkPassword($j.trim($j(a).val()))) {
		$j(a).next().html("请输入有效密码！").show();
		return
	}
	$j(a).attr("checked", true);
	$j(a).removeClass("error");
	$j(a).next().hide()
}

function resetPWDCheckConfirmPwd(a) {
	$j(a).attr("checked", false);
	$j(a).addClass("error");
	if ($j.trim($j(a).val()) == "") {
		return
	}
	if ($j.trim($j(a).val()) != $j.trim($j("#new-password").val())) {
		$j(a).next().html("抱歉，两次输入的密码不匹配！").show();
		return
	}
	$j(a).attr("checked", true);
	$j(a).removeClass("error");
	$j(a).next().hide()
}

function resetPWDCheckValidateCode(a) {
	$j(a).attr("checked", false);
	$j(a).addClass("error");
	if ($j.trim($j(a).val()) == "") {
		return
	}
	if ($j.trim($j(a).val()).length != 6) {
		$j(a).next().html("您填写的验证码有误，请重新输入！").show();
		return
	}
	$j(a).removeClass("error");
	$j(a).attr("checked", true);
	$j(a).next().html("").hide()
}

function initUnionLogin() {
	$j("body").on("click", ".union-login a", function() {
		var b = parseInt($j(this).data("width")) || 350;
		var e = parseInt($j(this).data("height")) || 600;
		var d = (window.screen.availHeight - 30 - e) / 2;
		var c = (window.screen.availWidth - 10 - b) / 2;
		var a = $j(this).data("href");
		window.open(a, "_blank", "scrollbars=yes,top=" + d + ",left=" + c + ",width=" + b + ",height=" + e + ",resizable=no,status=no,toolbar=no,menubar=no,location=no")
	})
}

function reloadHead(b, f, c) {
	var d = b.loginName;
	if (d.indexOf("欢迎") < 0) {
		if (d.indexOf("@") > -1) {
			d = d.substring(0, d.indexOf("@"))
		}
		if (d.length > 10) {
			d = "欢迎您，" + d.substring(0, 10)
		}
	}
	$j(".logining").html(d).parent().show();
	$j("#shoppingCartNum").text(f.quantity);
	shopCartNumUtil.saveCartNum(f.quantity);
	$j("#shoppingCartNum").parent().siblings(".cartLogo").hide();
	$j("#shoppingCartNum").parent().show();
	var e = $j("#shoppingCart");
	if (e.length > 0) {
		var a = loxia.syncXhr(loxia.encodeUrl(_contextPath + "/getMiniShoppingCart.htm", true));
		$j("#shoppingCart").parent().html(a)
	}
	if (typeof loginCallback == "function") {
		if (c == "/nowBuyDeliveryInfomation.htm") {} else {
			loginCallback(b, f)
		}
	}
	if (b && b.sendActivity) {
		if (!c
			/*!= '/deliveryInfomation.htm'*/
		) {
			sendActivity();
			couponPOP()
		}
	}
	if (typeof redirect == "string") {
		document.location.href = redirect
	}
}
window.addEventListener("message", function(b) {
	var a = b.origin || b.originalEvent.origin;
	if (a.indexOf("converse.com.cn") == -1) {
		return
	}
	if ("login" == b.data) {
		unionLoged()
	}
}, false);

function unionLoged() {
	$j(".blackbg").fadeOut(400);
	var a = loxia.syncXhrPost(_contextPath + "/member/member.json");
	if (a.memberCommand) {
		$j(".log-sign-button").parent().remove();
		$j(".header-expanded-content").remove();
		if ($j("#n-buy").val()) {
			reloadHead(a.memberCommand, a.listCommand, a.paymentUrl);
			window.location.href = _contextPath + a.paymentUrl
		} else {
			reloadHead(a.memberCommand, a.listCommand, "")
		}
	}
}

function sendActivity() {
	var a = [];
	a.push('<div class="pop-up-box-fff">');
	a.push('	<div class="dialog-container" style="margin-top: 70px;">');
	a.push(' 		<div class="reach-btn">优惠券已送至你账户！</div>');
	a.push(' 		<div class="content-btn">');
	a.push('  			<a href="' + _contextPath + '/myshop/myCoupon.htm" class="formwz-tj query-btn">查看我的优惠券</a>');
	a.push("		</div>");
	a.push(' 		<div class="content-btn"> ');
	a.push('     		<a href="' + _contextPath + '/index.htm" class="formwz-tj">立即购物</a>');
	a.push("  		</div>");
	a.push(' 		<div class="form-btm-img"><img src="' + domain_image + '/images/chuckII/lay-btm-fff.png"></div>');
	a.push(" 	</div>");
	a.push(' 	<a class="icon icon-close dialog-close" href="' + _contextPath + '/myshop/myCoupon.htm"></a>');
	a.push("</div>");
	var b = $j('<div style="width:600px; height:362px; position:absolute;margin-left:-300px;left:50%;display:none;"></div>');
	b.html(a.join(""));
	$j("body").append(b);
	var d = parseInt($j(document).scrollTop());
	b.css("top", d + $j(window).height() / 3 + "px");
	var c = $j(".popupbg");
	if (c.length == 0) {
		c = $j('<div class="popupbg"></div>');
		$j("body").append(c)
	}
	c.height($j(document).height()).show();
	b.show();
	$j(".blackbg").hide()
}

function checkForget2ResetPage() {
	disableForgetPasswordPage();
	enableResetPasswordPage()
}

function checkLogin2BindMobile() {
	disableLoginPage();
	enableBindMobilePage();
	loadSecuritycode("p_b")
}

function disableLoginPage() {
	$j("#login-form").css("display", "none")
}

function enableBindMobilePage() {
	$j("#bind-mobile-form").css("display", "block")
}

function disableForgetPasswordPage() {
	$j("#forget-password").css("display", "none")
}

function loadSecuritycode(a) {
	var b;
	if ("p_f_w" == a) {
		b = $j("#securitycode_forgetpass")
	}
	if ("p_l_w" == a) {
		b = $j("#securitycode_login")
	}
	if ("p_r_w" == a) {
		b = $j("#securitycode_register")
	}
	if ("p_b" == a) {
		b = $j("#securitycode_bindMobile")
	}
	if (b) {
		var c = loxia.syncXhrPost(_contextPath + "/loadSecuritycode.htm", {
			p: a
		});
		$j(b).html(c)
	}
}

function enableResetPasswordPage() {
	$j("#reset-password").removeClass("disabled");
	$j("#reset-password").css("display", "inline-block");
	loadSecuritycode("p_f_w")
};

function checkEmail(c) {
	var d = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return d.test(c.replace(/(^\s*)|(\s*$)/g, ""))
}

function checkDate(b) {
	var a = /^\d{4}-\d{2}-\d{2}$/;
	return a.test(b)
}

function checkMobile(a) {
	var b = /^(1[3-9]{1}[0-9]{1})\d{8}$/;
	return b.test(a)
}

function checkZipCode(b) {
	var a = /^[1-9][0-9]{5}$/;
	return a.test(b)
}

function checkTelephone(a) {
	var b = /^\d+$/;
	return b.test(a)
}

function checkPassword(a) {
	var b = /[^\x00-\xff]/;
	return !b.test(a)
}

function setValid(c, a, b) {
	$j(c).data("checked", a);
	if (a) {
		$j(c).removeClass("error");
		$j(c).next().hide()
	} else {
		$j(c).addClass("error");
		$j(c).next().html(b).show()
	}
}

function setError(d, a, b) {
	$j(d).data("checked", a);
	if (a) {
		$j(d).removeClass("error");
		$j(d).next().next().html("").hide()
	} else {
		$j(d).addClass("error");
		$j(d).next().next().html(b).show();
		var c = $j("#pop-register .layer").css("display");
		if ("block" == c) {
			detectImgReload("pc_popregister")
		} else {
			detectImgReload("pc_register")
		}
	}
}

function validSpecialWord(a) {
	var b = new RegExp("[`~!@%#$^&*()=|{}':;',　\\[\\]<>/? \\.；：%……+￥（）【】‘”“'。，、？]");
	return !b.test(a)
}

function showBirthdayText() {
	if ($j("#birthday").val() == "" && $j("#birthday").is(":visible")) {
		$j("#birthday_text").show();
		$j("#birthday_text").val("请输入您的生日")
	}
}

function WidthCheck(d, f) {
	var a = 0;
	for (var b = 0; b < d.length; b++) {
		var e = d.charCodeAt(b);
		if ((e >= 1 && e <= 126) || (65376 <= e && e <= 65439)) {
			a++
		} else {
			a += 2
		}
	}
	if (a > f) {
		return false
	}
	return true
}
$j(document).ready(function() {
	$j("#email-reg,#mobile-reg,#password-reg, #passwordAgain-reg").each(function() {
		$j(this).data("checked", false)
	});
	$j("#email-reg").blur(function() {
		d(this)
	});

	function d(i) {
		if ($j.trim($j(i).val()) == "") {
			setValid(i, false, "请输入电子邮箱地址！");
			return false
		} else {
			if (!WidthCheck($j(i).val(), 50)) {
				setValid(i, false, "Email地址框输入最大50个字符");
				return false
			}
			if (checkEmail($j.trim($j(i).val()))) {
				setValid(i, true, "")
			} else {
				setValid(i, false, "请输入有效的电子邮箱地址！");
				return false
			}
		}
		setValid(i, true, "");
		return true
	}
	$j("#mobile-reg").blur(function() {
		f(this)
	});
	$j("#validateMobile-reg").blur(function() {
		p(this)
	});

	function f(i) {
		if ($j.trim($j(i).val()) == "") {
			setValid(i, false, "请输入手机号码！");
			return false
		} else {
			if (checkMobile($j.trim($j(i).val()))) {} else {
				setValid(i, false, "请输入11位有效中国手机号码！");
				return false
			}
		}
		setValid(i, true, "");
		return true
	}
	$j("#password-reg").blur(function() {
		g(this)
	});

	function g(i) {
		if ($j.trim($j(i).val()) == "") {
			setValid(i, false, "请输入密码");
			return false
		}
		if ($j.trim($j(i).val()).length < 6 || $j.trim($j(i).val()).length > 12) {
			setValid(i, false, "密码为6-12位字符！");
			return false
		}
		if (checkPassword($j.trim($j(i).val())) && validSpecialWord($j(i).val())) {} else {
			setValid(i, false, "请输入有效密码！");
			return false
		}
		setValid(i, true, "");
		return true
	}
	$j("#passwordAgain-reg").blur(function() {
		r(this)
	});

	function r(i) {
		if ($j.trim($j(i).val()) == "") {
			setValid(i, false, "请再次输入密码");
			return false
		}
		if ($j.trim($j(i).val()) != $j.trim($j("#password-reg").val())) {
			setValid(i, false, "抱歉，两次输入的密码不匹配！");
			return false
		}
		setValid(i, true, "");
		return true
	}
	$j(".gender").click(function() {
		if ($j(this).hasClass("chosen")) {
			return
		}
		$j(".gender.error").removeClass("error");
		$j(".gender.chosen").removeClass("chosen");
		$j(this).addClass("chosen");
		var i = $j("#pop-register .layer").css("display");
		if ("block" == i) {
			$j("#pop-gender-reg").val($j(this).text())
		} else {
			$j("#gender-reg").val($j(this).text())
		}
	});
	$j("#validateCode-reg").blur(function() {
		j(this)
	});

	function j(i) {
		if ($j.trim($j(i).val()) == "") {
			$j(i).data("checked", false);
			$j(i).next().next().html("请输入验证码");
			$j(i).siblings(".error").html("您填写的验证码有误，请重新输入！").show();
			$j(i).addClass("error");
			return
		}
		if ($j.trim($j(i).val()).length != 4) {
			$j(i).data("checked", false);
			$j(i).siblings(".error").html("您填写的验证码有误，请重新输入！").show();
			$j(i).addClass("error");
			return false
		}
		$j(i).removeClass("error");
		$j(i).data("checked", true);
		$j(i).next().next().next().html("").hide();
		return true
	}

	function p(i) {
		if ($j.trim($j(i).val()) == "") {
			$j(i).data("checked", false);
			$j(i).addClass("error");
			$j(i).siblings(".error").html("您填写的短信验证码有误，请重新输入！").show();
			return false
		}
		if ($j.trim($j(i).val()).length != 6) {
			$j(i).data("checked", false);
			$j(i).addClass("error");
			$j(i).siblings(".error").html("您填写的短信验证码有误，请重新输入！").show();
			return false
		}
		$j(i).data("checked", true);
		$j(i).siblings(".error").html("");
		$j(i).removeClass("error");
		return true
	}
	var a = new Date();
	var e = a.getFullYear();
	var o = a.getMonth() + 1;
	var n = a.getDate();
	$j("#birthday-year").change(function() {
		$j(".birthday-box .selectbox").css("border", "");
		if ($j(this).find("option:selected").val() == e) {
			for (var t = $j("#birthday-month option").length + 1; t <= 12; t++) {
				$j("#birthday-month").append('<option value="' + t + '">' + t + "</option>")
			}
			$j("#birthday-month option:gt(" + (o - 1) + ")").remove()
		} else {
			if ($j("#birthday-month option").length < 12) {
				for (var t = $j("#birthday-month option").length + 1; t <= 12; t++) {
					$j("#birthday-month").append('<option value="' + t + '">' + t + "</option>")
				}
			}
		}
		$j("#birthday-month").trigger("change")
	});
	$j("#birthday-month").change(function() {
		var x = $j("#birthday-year").find("option:selected").val();
		var w = $j(this).find("option:selected").val();
		var t = 31;
		if (x == e && w == o) {
			t = n
		} else {
			if (w == 4 || w == 6 || w == 9 || w == 11) {
				t = 30
			} else {
				if (w == 2 && x % 4 == 0) {
					t = 29
				} else {
					if (w == 2 && x % 4 != 0) {
						t = 28
					}
				}
			}
		}
		$j("#birthday-date option:gt(" + (t - 1) + ")").remove();
		for (var v = $j("#birthday-date option").length + 1; v <= t; v++) {
			$j("#birthday-date").append('<option value="' + v + '">' + v + "</option>")
		}
		$j("#birthday-date").trigger("change");
		var u = $j("#birthday-date option:selected").val();
		$j("#birthday-reg").val(x + "-" + ((w < 10) ? "0" : "") + w + "-" + ((u < 10) ? "0" : "") + u)
	});
	for (var k = e; k >= e - 100; k--) {
		$j("#birthday-year").append('<option value="' + k + '">' + k + "</option>")
	}
	$j("#birthday-date").change(function() {
		var i = $j("#birthday-date option:selected").val();
		var u = $j("#birthday-year").find("option:selected").val();
		var t = $j("#birthday-month").find("option:selected").val();
		$j("#birthday-reg").val(u + "-" + ((t < 10) ? "0" : "") + t + "-" + ((i < 10) ? "0" : "") + i)
	});
	$j("#birthday-year option:eq(0)").attr("selected");
	$j("#birthday-year").trigger("change");

	function m() {
		var i = $j("#gender-reg").val();
		if (i == "男的" || i == "女的") {
			return true
		}
		$j(".gender").addClass("error");
		return false
	}

	function c() {
		var i = $j("#birthday-reg").val();
		if ($j.trim(i) == "" || !checkDate(i)) {
			$j(".birthday-box .selectbox").css("border", "1px solid red");
			return false
		}
		return true
	}
	$j("#registration-btn").click(function() {
		var H = d($j("#email-reg")[0]);
		var x = f($j("#mobile-reg")[0]);
		var G = g($j("#password-reg")[0]);
		var u = r($j("#passwordAgain-reg")[0]);
		var C = !gt ? j($j("#validateCode-reg")[0]) : true;
		var D = m();
		var A = c();
		var i = p($j("#validateMobile-reg")[0]);
		var F = H && x && G && u && C && D && A && i;
		if (F) {
			if (!gt) {
				if (checkImgCode($j.trim($j("#validateCode-reg").val()))) {} else {
					$j("#validateCode-reg").siblings(".error").html("验证码错误！").show();
					detectImgReload("pc_register");
					return
				}
			} else {
				if (!$j("#challenge").val()) {
					$j("#heard-regist-gt").find(".error").html("验证错误！");
					return
				}
			}
			var z = $j("#validateMobile-reg").attr("checkurl") + "&smsCode=" + $j.trim($j.trim($j("#validateMobile-reg").val())) + "&mobile=" + ($j.trim($j("#mobile-reg").val()));
			var B = loxia.syncXhr(z, {});
			if (B && B.result) {} else {
				if (B.error) {
					$j("#validateMobile-reg").siblings("span").html(B.error).addClass("error").show()
				} else {
					$j("#validateMobile-reg").siblings("span").html("您填写的短信验证码有误，请重新输入！").addClass("error").show()
				}
				detectImgReload("pc_register");
				return
			}
			var v = _contextPath + "/registration.json";
			var y = $j("#modulus").val();
			var E = $j("#exponent").val();
			var J = RSAUtils.getKeyPair(E, "", y);
			var t = RSAUtils.encryptedString(J, $j("#password-reg").val());
			var w = RSAUtils.encryptedString(J, $j("#passwordAgain-reg").val());
			var I = GEETEST.getValiDate();
			var B = loxia.syncXhrPost(v, {
				email: $j.trim($j("#email-reg").val()),
				password: $j.trim(t),
				passwordAgain: $j.trim(w),
				mobile: $j("#mobile-reg").val(),
				gender: $j("#gender-reg").val(),
				birthday: $j("#birthday-reg").val(),
				sercuitycode: $j("#validateCode-reg").val(),
				mobileCode: $j.trim($j("#validateMobile-reg").val()),
				LBD_VCID_pc_register: $j("#LBD_VCID_pc_register").val(),
				way: "p_r_w",
				challenge: I.geetest_challenge,
				validate: I.geetest_validate,
				seccode: I.geetest_seccode
			});
			if (B.res == "success") {
				$j(".log-sign-button").trigger("click").parent().remove();
				reloadHead(B.memberCommand, B.listCommand, B.paymentUrl);
				if (B.paymentUrl) {
					window.location.href = B.paymentUrl
				}
			} else {
				showMessage(B.res, function() {
					if (!gt) {
						detectImgReload("pc_register")
					} else {
						GEETEST.register(GEETEST.heardRegisterCall)
					}
				})
			}
			registerGridsum($j.trim($j("#email-reg").val()), $j("#mobile-reg").val(), $j("#gender-reg").val(), $j("#birthday-reg").val())
		}
	});
	$j(".registration-content .send-mobile-desction").click(q);

	function q() {
		if (!$j($j(".btn-send-mobile")[0]).data("btnClickFlag")) {
			if (!checkMobile($j("#mobile-reg").val())) {
				$j("#mobile-reg").siblings(".error").html("请输入11位有效中国手机号码！").show();
				return
			}
			if (gt) {
				if (!$j("#challenge").val()) {
					$j("#heard-regist-gt").find(".error").html("请先验证！！");
					return
				}
				$j("#heard-regist-gt").find(".error").html("")
			} else {
				if (!j($j("#validateCode-reg")[0])) {
					return
				} else {
					if (!checkImgCode($j("#validateCode-reg").val())) {
						$j("#validateCode-reg").siblings(".error").html("您填写的验证码有误，请重新输入！").show();
						detectImgReload("pc_register");
						return
					}
				}
			}
			$j("#validateCode-reg").siblings(".error").html("").show();
			countDown.apply($j(".btn-send-mobile")[0]);
			sendRegSmsCode.apply($j(".registration-content .send-mobile-desction")[0], [function() {}]);
			detectImgReload("pc_register")
		}
	}
	s();

	function s() {
		$j("#pop-email-reg,#pop-mobile-reg,#pop-password-reg, #pop-passwordAgain-reg").each(function() {
			$j(this).data("checked", false)
		});
		$j("body").on({
			click: function() {
				if ($j(this).find("#pop-mobileCode-reg").length < 0) {
					$j(this).find("span").css("display", "none");
					$j(this).find("input").focus()
				}
			},
			focus: function() {
				$j(this).find("span").css("display", "none")
			}
		}, ".layer .labelbox");
		$j("body").on("blur", "#pop-email-reg", function() {
			d(this)
		});
		$j("body").on("blur", "#pop-mobile-reg", function() {
			f(this)
		});
		$j("body").on("blur", "#pop-password-reg", function() {
			g(this)
		});
		$j("body").on("blur", "#pop-passwordAgain-reg", function() {
			l(this)
		});
		$j("body").on("blur", "#pop-validateCode-reg", function() {
			j(this)
		});
		$j("body").on("blur", "#pop-mobileCode-reg", function() {
			p(this)
		});
		$j("body").on("click", "#pop-form .gender", function() {
			if ($j(this).hasClass("chosen")) {
				return
			}
			$j(".gender.error").removeClass("error");
			$j(".gender.chosen").removeClass("chosen");
			$j(this).addClass("chosen");
			$j("#pop-gender-reg").val($j(this).text())
		});
		$j("body").on("click", "#pop-registration-btn", function() {
			var H = d($j("#pop-email-reg")[0]);
			var x = f($j("#pop-mobile-reg")[0]);
			var G = g($j("#pop-password-reg")[0]);
			var u = l($j("#pop-passwordAgain-reg")[0]);
			var C = !gt ? j($j("#pop-validateCode-reg")[0]) : true;
			var D = h();
			var A = b();
			var i = p($j("#pop-mobileCode-reg")[0]);
			var F = H && x && G && u && C && D && A && i && D;
			if (F) {
				if (!gt) {
					if (checkPopImgCode($j.trim($j("#pop-validateCode-reg").val()))) {} else {
						$j("#pop-validateCode-reg").siblings(".error").html("您填写的图片验证码有误，请重新输入！").show();
						detectImgReload("pc_popregister");
						return
					}
				} else {
					if (!$j("#challenge").val()) {
						$j("#popup-regist-gt").children(".error").html("请先进行验证！");
						return
					}
				}
				var z = $j("#pop-mobileCode-reg").attr("checkurl") + "&smsCode=" + $j.trim($j("#pop-mobileCode-reg").val()) + "&mobile=" + $j.trim($j("#pop-mobile-reg").val());
				var B = loxia.syncXhr(z, {});
				if (B && B.result) {} else {
					if (B.error) {
						$j("#pop-mobileCode-reg").siblings("span").html(B.error).addClass("error").show()
					} else {
						$j("#pop-mobileCode-reg").siblings("span").html("您填写的短信验证码有误，请重新输入！").addClass("error").show()
					}
					detectImgReload("pc_popregister");
					return
				}
				var v = _contextPath + "/registration.json";
				var y = $j("#modulus").val();
				var E = $j("#exponent").val();
				var J = RSAUtils.getKeyPair(E, "", y);
				var t = RSAUtils.encryptedString(J, $j("#pop-password-reg").val());
				var w = RSAUtils.encryptedString(J, $j("#pop-passwordAgain-reg").val());
				var I = GEETEST.getValiDate();
				var B = loxia.syncXhrPost(v, {
					email: $j.trim($j("#pop-email-reg").val()),
					password: $j.trim(t),
					passwordAgain: $j.trim(w),
					mobile: $j("#pop-mobile-reg").val(),
					gender: $j("#pop-gender-reg").val(),
					birthday: $j("#pop-birthday-reg").val(),
					sercuitycode: $j("#pop-validateCode-reg").val(),
					mobileCode: $j.trim($j("#pop-mobileCode-reg").val()),
					LBD_VCID_pc_popregister: $j("#LBD_VCID_pc_popregister").val(),
					way: "p_pr_w",
					challenge: I.geetest_challenge,
					validate: I.geetest_validate,
					seccode: I.geetest_seccode
				});
				if (B.res == "success") {
					$j(".layer .dialog-close").trigger("click");
					reloadHead(B.memberCommand, B.listCommand, B.paymentUrl);
					$j(".log-sign-button").parent().remove();
					if (B.paymentUrl) {
						window.location.href = B.paymentUrl
					}
				} else {
					showMessage(B.res, function() {
						if (!gt) {
							detectImgReload("pc_popregister")
						} else {
							GEETEST.register(GEETEST.popupRegisterCall)
						}
					});
					$j(".message-popup").css("z-index", "9999")
				}
				registerGridsum($j.trim($j("#pop-email-reg").val()), $j("#pop-mobile-reg").val(), $j("#pop-gender-reg").val(), $j("#pop-birthday-reg").val())
			}
		});
		$j("body").on("click touchend", ".layer .dialog-close, .reg.popupbg", function() {
			$j(".popupbg").hide();
			$j(".blackbg").hide();
			$j(".layer").hide()
		})
	}

	function h() {
		var i = $j("#pop-gender-reg").val();
		if (i == "男的" || i == "女的") {
			return true
		}
		$j("#pop-form .gender").addClass("error");
		return false
	}

	function l(i) {
		if ($j.trim($j(i).val()) == "") {
			setValid(i, false, "请再次输入密码");
			return false
		}
		if ($j.trim($j(i).val()) != $j.trim($j("#pop-form").find("#pop-password-reg").val())) {
			setValid(i, false, "抱歉，两次输入的密码不匹配！");
			return false
		}
		setValid(i, true, "");
		return true
	}

	function b() {
		var i = $j("#pop-birthday-reg").val();
		if ($j.trim(i) == "" || !checkDate(i)) {
			$j("#pop-form .birthday-box .selectbox").css("border", "1px solid red");
			return false
		}
		return true
	}
});
$j(document).ready(function() {
	if (getCookie("loginUserName") && getCookie("deex") && getCookie("modu")) {
		var a = RSAUtils.getKeyPair("", getCookie("deex"), getCookie("modu"));
		var g = RSAUtils.decryptedString(a, getCookie("loginUserName"));
		if (g.length <= 0) {
			g = "欢迎登录"
		} else {
			g = "欢迎您," + g
		}
		$j("#memberName").html(g);
		$j("#notempty-memberName").show();
		$j("#empty-memberName").hide()
	} else {
		$j("#notempty-memberName").hide();
		$j("#empty-memberName").show()
	}
	if (!getCookie("loginUserName") && omniture_pagename.indexOf("buy flow > check out > home") > -1) {
		$j("#notempty-memberName").hide();
		$j("#empty-memberName").hide()
	}
	var f = $j("#hasresult").val();
	if (f == "false") {
		loadHotSales()
	}

	function d() {
		var i = [];
		$j(".property-li div").each(function() {
			var j = $j(this);
			i.push(j.attr("key"))
		});
		return i
	}
	var c = true;
	$j(".search-content input").keydown(function(i) {
		if (i && i.keyCode == 13) {
			$j("#search_btn").click()
		}
	});
	$j("#search_btn").click(function() {
		if (c) {
			var i = $j.trim($j("#search_txt").val());
			i = escape_cr(i);
			if ("想找什么随便搜" != i && 0 < i.length) {
				$j("#search_txt").val(i);
				$j("#search_txt").next("span").hide();
				window.location.href = _contextPath + "/skey.htm?keyword=" + i
			}
		}
	});
	$j(".keySuggest").live("click", function() {
		if (c) {
			c = false;
			var k = $j(this).text();
			k = escape_cr(k);
			$j("#search_txt").next("span").hide();
			$j("#search_txt").val(k);
			$j("#data_loading").show();
			if ("想找什么随便搜" != k && 0 < k.length) {
				$j("#search_txt").next("span").hide();
				var j = loxia.syncXhr(_contextPath + "/s-" + k + ".htm");
				$j(".search-result").html(j);
				$j(".search-product-list dt img").lazyload({
					effect: "fadeIn",
					placeholder: CONVERSE.DEFAULTS.placeholderImg
				});
				var i = new CONVERSE.TINYSEACHSCROLL;
				i.initScroll();
				$j(window).trigger("scroll")
			}
			$j("#data_loading").hide();
			$j(".keySuggest").find("a").each(function(l, m) {
				if ($j(m).text() == k) {
					$j(m).addClass("chose")
				}
			});
			c = true
		}
	});
	$j(".sort-list a").live("click", function() {
		var l = window.location.href;
		var n = $j(this);
		if (n.hasClass("disable")) {
			return
		}
		var i = n.data("sort");
		if (i != null && i != "") {
			var o = $j("#currentPage").val();
			var s = $j("#pageRowsVal").val();
			var k = "";
			$j(".attribute-li div").each(function(u, t) {
				k = k + "," + $j(this).attr("key")
			});
			var m = d();
			var p = $j(".price-li").attr("maxKey");
			var j = $j(".price-li").attr("minKey");
			var r = $j(".size-li div").attr("key");
			changeSortOmniture(i);
			var q = loxia.syncXhr(l, {
				attributeParams: k,
				propertyCode: m.join(","),
				size: r,
				maxprice: p,
				minprice: j,
				sort: i,
				pageNo: o,
				rowsNum: s,
				isPaging: true
			});
			$j(".pagecontent").html(q);
			$j(".product-list dt img, .product-list-kv img").lazyload({
				effect: "fadeIn",
				placeholder: CONVERSE.DEFAULTS.placeholderImg
			});
			$j(window).trigger("scroll")
		} else {
			var o = $j("#currentPage").val();
			var s = $j("#pageRowsVal").val();
			var k = "";
			$j(".attribute-li div").each(function(u, t) {
				k = k + "," + $j(this).attr("key")
			});
			var m = d();
			var p = $j(".price-li").attr("maxKey");
			var j = $j(".price-li").attr("minKey");
			var r = $j(".size-li div").attr("key");
			changeSortOmniture(i);
			var q = loxia.syncXhr(l, {
				attributeParams: k,
				propertyCode: m.join(","),
				size: r,
				maxprice: p,
				minprice: j,
				pageNo: o,
				rowsNum: s,
				isPaging: true
			});
			$j(".pagecontent").html(q);
			$j(".product-list dt img, .product-list-kv img").lazyload({
				effect: "fadeIn",
				placeholder: CONVERSE.DEFAULTS.placeholderImg
			});
			$j(window).trigger("scroll")
		}
	});
	$j("select[name='orderFilter']").live("change", function() {
		var l = window.location.href;
		var i = $j(this).val();
		if (null != i && i.length != "") {
			var n = $j("#currentPage").val();
			var r = $j("#pageRowsVal").val();
			var k = "";
			$j(".attribute-li div").each(function(t, s) {
				k = k + "," + $j(this).attr("key")
			});
			var m = d();
			var o = $j(".price-li").attr("maxKey");
			var j = $j(".price-li").attr("minKey");
			var q = $j(".size-li div").attr("key");
			changeSortOmniture(i);
			var p = loxia.syncXhr(l, {
				attributeParams: k,
				propertyCode: m.join(","),
				size: q,
				maxprice: o,
				minprice: j,
				sort: i,
				pageNo: n,
				rowsNum: r,
				isPaging: true
			});
			$j(".pagecontent").html(p);
			$j(".product-list dt img").lazyload({
				effect: "fadeIn",
				placeholder: CONVERSE.DEFAULTS.placeholderImg
			});
			$j(window).trigger("scroll")
		} else {
			var n = $j("#currentPage").val();
			var r = $j("#pageRowsVal").val();
			var k = "";
			$j(".attribute-li div").each(function(t, s) {
				k = k + "," + $j(this).attr("key")
			});
			var m = d();
			var o = $j(".price-li").attr("maxKey");
			var j = $j(".price-li").attr("minKey");
			var q = $j(".size-li div").attr("key");
			changeSortOmniture(i);
			var p = loxia.syncXhr(l, {
				attributeParams: k,
				propertyCode: m.join(","),
				size: q,
				maxprice: o,
				minprice: j,
				pageNo: n,
				rowsNum: r,
				isPaging: true
			});
			$j(".pagecontent").html(p);
			$j(".product-list dt img").lazyload({
				effect: "fadeIn",
				placeholder: CONVERSE.DEFAULTS.placeholderImg
			});
			$j(window).trigger("scroll")
		}
	});
	$j("select[name='pageRow']").live("change", function() {
		var l = window.location.href;
		var r = $j(this).val();
		if (r != $j("#pageRowsVal").val() && r.length > 0) {
			var i = $j("#orderFilter").val();
			var n = $j("#currentPage").val();
			var k = "";
			$j(".attribute-li div").each(function(t, s) {
				k = k + "," + $j(this).attr("key")
			});
			var m = d();
			var o = $j(".price-li").attr("maxKey");
			var j = $j(".price-li").attr("minKey");
			var q = $j(".size-li div").attr("key");
			var p = loxia.syncXhr(l, {
				attributeParams: k,
				propertyCode: m.join(","),
				size: q,
				maxprice: o,
				minprice: j,
				sort: i,
				rowsNum: r,
				isPaging: true
			});
			$j(".pagecontent").html(p);
			$j(".product-list dt img").lazyload({
				effect: "fadeIn",
				placeholder: CONVERSE.DEFAULTS.placeholderImg
			});
			$j(window).trigger("scroll")
		}
	});
	$j(".product-list-page li").live("click", function() {
		var l = window.location.href;
		if (!$j(this).hasClass("ellipsis") && !$j(this).hasClass("select")) {
			var n = $j(this).text();
			var i = $j("#orderFilter").val();
			var r = $j("#pageRowsVal").val();
			var k = "";
			$j(".attribute-li div").each(function(t, s) {
				k = k + "," + $j(this).attr("key")
			});
			var m = d();
			var o = $j(".price-li").attr("maxKey");
			var j = $j(".price-li").attr("minKey");
			var q = $j(".size-li div").attr("key");
			var p = loxia.syncXhr(l, {
				attributeParams: k,
				propertyCode: m.join(","),
				size: q,
				maxprice: o,
				minprice: j,
				sort: i,
				pageNo: n,
				rowsNum: r,
				isPaging: true
			});
			$j(".pagecontent").html(p);
			$j(".product-list dt img").lazyload({
				effect: "fadeIn",
				placeholder: CONVERSE.DEFAULTS.placeholderImg
			});
			$j(window).trigger("scroll")
		}
	});
	$j(".product-list-page .nextpage").live("click", function() {
		var l = window.location.href;
		var n = $j("#currentPage").val();
		var i = $j("#orderFilter").val();
		var r = $j("#pageRowsVal").val();
		var k = "";
		$j(".attribute-li div").each(function(t, s) {
			k = k + "," + $j(this).attr("key")
		});
		var m = d();
		var o = $j(".price-li").attr("maxKey");
		var j = $j(".price-li").attr("minKey");
		var q = $j(".size-li div").attr("key");
		var p = loxia.syncXhr(l, {
			attributeParams: k,
			propertyCode: m.join(","),
			size: q,
			maxprice: o,
			minprice: j,
			sort: i,
			pageNo: ++n,
			rowsNum: r,
			isPaging: true
		});
		$j(".pagecontent").html(p);
		$j(".product-list dt img").lazyload({
			effect: "fadeIn",
			placeholder: CONVERSE.DEFAULTS.placeholderImg
		});
		$j(window).trigger("scroll")
	});
	$j(".product-list-page .prevpage").live("click", function() {
		var l = window.location.href;
		var n = $j("#currentPage").val();
		var i = $j("#orderFilter").val();
		var r = $j("#pageRowsVal").val();
		var k = "";
		$j(".attribute-li div").each(function(t, s) {
			k = k + "," + $j(this).attr("key")
		});
		var m = d();
		var o = $j(".price-li").attr("maxKey");
		var j = $j(".price-li").attr("minKey");
		var q = $j(".size-li div").attr("key");
		var p = loxia.syncXhr(l, {
			attributeParams: k,
			propertyCode: m.join(","),
			size: q,
			maxprice: o,
			minprice: j,
			sort: i,
			pageNo: --n,
			rowsNum: r,
			isPaging: true
		});
		$j(".pagecontent").html(p);
		$j(".product-list dt img").lazyload({
			effect: "fadeIn",
			placeholder: CONVERSE.DEFAULTS.placeholderImg
		});
		$j(window).trigger("scroll")
	});
	var b = 1;
	var h = false;
	$j(window).scroll(function() {
		b = parseInt($j(".currentPage").last().val());
		if (h) {
			return
		}
		e()
	});

	function e() {
		var q = $j(window).scrollTop();
		if ($j("#sku-product-list").find("dl").last().position() != null) {
			var p = $j("#sku-product-list").find("dl").last().position().top;
			if (q + $j(window).height() > p) {
				var o = parseInt($j("#totalPage").val());
				var i = o > b;
				var n = window.location.href;
				if (n.indexOf("?") > -1) {
					n = n.substr(0, n.indexOf("?"))
				}
				if (n.charAt("/") == (n.length - 1)) {
					n = n.substr(0, n.length - 1)
				}
				if (n.indexOf("htm/")) {
					n = n.replace("htm/", "htm")
				}
				if (b >= 1 && i) {
					h = true;
					var j = $j("#orderFilter").val();
					var u = $j("#pageRowsVal").val();
					var l = "";
					$j(".attribute-li div").each(function(w, v) {
						l = l + "," + $j(this).attr("key")
					});
					var r = d();
					var s = $j(".price-li").attr("maxKey");
					var k = $j(".price-li").attr("minKey");
					var t = $j(".size-li div").attr("key");
					var m = {
						attributeParams: l,
						propertyCode: r.join(","),
						size: t,
						maxprice: s,
						minprice: k,
						sort: j,
						pageNo: b + 1,
						rowsNum: u,
						isPaging: false
					};
					$j.ajax({
						url: n,
						data: m,
						success: function(v) {
							h = false;
							b++;
							if (typeof v == "string" && v.indexOf("error-container") >= 0) {
								console.log("No." + b + " sku list load fail!");
								$j("#sku-product-list").append("<input type='hidden' class='currentPage' value='" + b + "' />");
								return
							}
							$j("#sku-product-list").append(v);
							$j(".product-list dt img").lazyload({
								effect: "fadeIn",
								placeholder: CONVERSE.DEFAULTS.placeholderImg
							})
						},
						error: function() {
							h = false
						}
					})
				}
			}
		}
	}
});
$j(window).ready(function() {
	var b = $j("#shoppingCartNum");
	if ((omniture_pagename == "buy flow > shopping cart > home") || (omniture_pagename == " buy flow > order payment > home")) {
		shopCartNumUtil.deleteCartNum()
	}
	var a = shopCartNumUtil.getCartNum();
	if (!a || (typeof Number(a) != "number")) {
		requestHeaderShoppingCart()
	} else {
		var a = shopCartNumUtil.getCartNum();
		$j("#shoppingCartNum").html(a)
	}
});

function getCookie(d) {
	var a = document.cookie,
		b = new RegExp(d + "=([^;]*)");
	var c = "";
	if (b.test(a)) {
		c = RegExp.$1
	}
	return c
}

function showFooterContent() {
	var a = window.location.pathname;
	if (a == "/all_star/category.htm") {
		$j(".all_star-list").show()
	} else {
		if (a == "/Chuck_II/category.htm") {
			$j(".chuckII-list").show()
		}
	}
}

function requestHeaderShoppingCart() {
	var a = loxia.encodeUrl(_contextPath + "/requestHeaderShoppingCart1.json", true);
	loxia.asyncXhrPost(a, {}, {
		success: function(c, d) {
			if (c) {
				var b = 0;
				if (c.cartSize) {
					b = c.cartSize;
					$j("#shoppingCartNum").html(b)
				}
				shopCartNumUtil.saveCartNum(b)
			}
		},
		error: function() {}
	})
}

function loadHotSales() {
	$j("#list-slide-container-sneaker").load(_contextPath + "/loadHomeProducts.htm?propertyCode=sneaker", function() {
		var b = $j("#list-slide-container-sneaker");
		b.find(".l-s-grid:last").addClass("noborder");
		var c = b.find(".product-list-slide");
		var a = c.find(".brand-product").height();
		c.height(a);
		$j("#list-slide-container-sneaker dt img").lazyload({
			effect: "fadeIn",
			placeholder: CONVERSE.DEFAULTS.placeholderImg
		});
		$j(window).trigger("scroll")
	})
};