String.prototype.toTitleCase = function () {
	return this.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

function selectText() {
	const target = event.target;
	var range = document.createRange();
	range.selectNode(target);
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(range);
}

function copy() {
	selectText();
	document.execCommand("copy");
	alert("Copied MCR Code to clipboard!");
}

function parse() {
	const input = document.querySelector('#parser-input');
	const output = document.querySelector('#parser-output');
	const code = input.value;
	var parsed = "";
	var rgx;
	rgx = code.match(/N[+\-!]*/);
	if (rgx === null) {
		parsed += "Member Count: Unspecified";
	} else {
		parsed += "Member Count: ";
		switch (rgx[0]) {
			case 'N---':
				parsed += "1";
				break;
			case 'N--':
				parsed += "2-5";
				break;
			case 'N-':
				parsed += "6-10";
				break;
			case 'N':
				parsed += "11-20";
				break;
			case 'N+':
				parsed += "21-50";
				break;
			case 'N++':
				parsed += "51-80";
				break;
			case 'N+++':
				parsed += "81-100";
				break;
			case 'N++++':
				parsed += "101-500";
				break;
			case 'N++++!':
				parsed += "501-1000";
				break;
			case 'N++++!!':
				parsed += ">1000";
				break;
			case 'N?':
				parsed += "Unknown";
				break;
		}
	}
	parsed += "<br>";
	rgx = code.match(/(?<=P\[).*(?=\])/);
	if (rgx === null) {
		parsed += "Presentation: Unspecified";
	} else {
		parsed += "Presentation: ";
		rgx[0].split("/").forEach(opt => {
			opt = opt.trim();
			if (opt.includes('o"')) {
				const tmp = opt.match(/(?<=o").*(?=")/)[0];
				parsed += tmp.toTitleCase() + ", ";
			} else {
				switch (opt) {
					case 'f':
						parsed += "Female, ";
						break;
					case 'm':
						parsed += "Male, ";
						break;
					case 'n':
						parsed += "Neutral, ";
						break;
					case 'nb':
						parsed += "Non-Binary, ";
						break;
					case 'a':
						parsed += "Agender, ";
						break;
					case 'i':
						parsed += "Intersex, ";
						break;
					case 'b':
						parsed += "Bigender, ";
						break;
					case 't':
						parsed += "Third Gender, ";
						break;
					case 'gf':
						parsed += "Genderfluid, ";
						break;
					case 'gq':
						parsed += "Genderqueer, ";
						break;
					case 'x':
						parsed += "Gender Questioning, ";
						break;
					case 'g':
						parsed += "Gay, ";
						break;
					case 'l':
						parsed += "Lesbian, ";
						break;
					case 'bi':
						parsed += "Bisexual, ";
						break;
					case 'p':
						parsed += "Pansexual, ";
						break;
					case 'qr':
						parsed += "Queer, ";
						break;
					case 'ar':
						parsed += "Aromantic, ";
						break;
					case 'as':
						parsed += "Asexual, ";
						break;
					case 'xo':
						parsed += "Questioning Orientation, ";
						break;
					case 'o':
						parsed += "Other, ";
						break;
				}
			}
		});
		parsed = parsed.replace(/, ([^,]*)$/, "");
	}
	parsed += "<br>";
	rgx = code.match(/(?<=A\().*?(?=\))/);
	if (rgx === null) {
		parsed += "Age: Unspecified";
	} else {
		parsed += "Age: ";
		rgx[0].split(" ").forEach(opt => {
			if (opt != "") {
				if (opt.includes("b")) {
					switch (opt) {
						case "b---!":
							parsed += "0-4yrs (Body)";
							break;
						case "b---":
							parsed += "5-10yrs (Body)";
							break;
						case "b--":
							parsed += "11-15yrs (Body)";
							break;
						case "b-":
							parsed += "16-18yrs (Body)";
							break;
						case "b":
							parsed += "19-35yrs (Body)";
							break;
						case "b+":
							parsed += "36-55yrs (Body)";
							break;
						case "b++":
							parsed += "56-90yrs (Body)";
							break;
						case "b+++":
							parsed += "91-100yrs (Body)";
							break;
						case "b+++!":
							parsed += "101-1000yrs (Body)";
							break;
						case "b+++!!" || "b+++!!!":
							parsed += ">1000yrs (Body)";
							break;
						case "b^":
							parsed += "Ageless (Body)";
							break;
					}
					parsed += "; ";
				} else {
					opt = opt.replace(/r/, "");
					opt = opt.replace(/\)/, "");
					if (opt.includes("/")) {
						opt = opt.split("/");
						switch (opt[0]) {
							case "---!":
								parsed += "0-";
								break;
							case "---":
								parsed += "5-";
								break;
							case "--":
								parsed += "11-";
								break;
							case "-":
								parsed += "16-";
								break;
							case "":
								parsed += "19-";
								break;
							case "+":
								parsed += "36-";
								break;
							case "++":
								parsed += "56-";
								break;
							case "+++":
								parsed += "91-";
								break;
							case "+++!":
								parsed += "101-";
								break;
							case "+++!!" || "+++!!!":
								parsed += ">1000yrs-";
								break;
							case "^":
								parsed += "Ageless-";
								break;
						}
						switch (opt[1]) {
							case "---!":
								parsed += "4yrs (Members)";
								break;
							case "---":
								parsed += "10yrs (Members)";
								break;
							case "--":
								parsed += "15yrs (Members)";
								break;
							case "-":
								parsed += "18yrs (Members)";
								break;
							case "":
								parsed += "35yrs (Members)";
								break;
							case "+":
								parsed += "55yrs (Members)";
								break;
							case "++":
								parsed += "90yrs (Members)";
								break;
							case "+++":
								parsed += "100yrs (Members)";
								break;
							case "+++!":
								parsed += "1000yrs (Members)";
								break;
							case "+++!!" || "+++!!!":
								parsed += ">1000yrs (Members)";
								break;
							case "^":
								parsed += "Ageless (Members)";
								break;
						}
					} else {
						switch (opt) {
							case "---!":
								parsed += "0-4yrs (Members)";
								break;
							case "---":
								parsed += "5-10yrs (Members)";
								break;
							case "--":
								parsed += "11-15yrs (Members)";
								break;
							case "-":
								parsed += "16-18yrs (Members)";
								break;
							case "":
								parsed += "19-35yrs (Members)";
								break;
							case "+":
								parsed += "36-55yrs (Members)";
								break;
							case "++":
								parsed += "56-90yrs (Members)";
								break;
							case "+++":
								parsed += "91-100yrs (Members)";
								break;
							case "+++!":
								parsed += "101-1000yrs (Members)";
								break;
							case "+++!!" || "b+++!!!":
								parsed += ">1000yrs (Members)";
								break;
							case "^":
								parsed += "Ageless (Members)";
								break;
						}
					}
				}
			}
		});
	}
	parsed += "<br>";
	rgx = code.match(/(?<=O)\S*/);
	if (rgx === null) {
		parsed += "Origins: Unspecified";
	} else {
		parsed += "Origins: ";
		rgx[0].split("/").forEach(opt => {
			switch (opt) {
				case 't':
					parsed += "Traumagenic, ";
					break;
				case 'e':
					parsed += "Endogenic, ";
					break;
				case 'p':
					parsed += "Protogenic, ";
					break;
				case 'r':
					parsed += "Pariogenic, ";
					break;
				case 'pa':
					parsed += "Parogenic, ";
					break;
				case 'n':
					parsed += "Neurogenic, ";
					break;
				case 'm':
					parsed += "Multigenic, ";
					break;
				case 'q':
					parsed += "Quoigenic, ";
					break;
				case 'pr':
					parsed += "Praesigenic, ";
					break;
				case 'mt':
					parsed += "Metagenic, ";
					break;
				case 'x':
					parsed += "Xenogenic, ";
					break;
				case 'a':
					parsed += "Agenic, ";
					break;
				case 'ad':
					parsed += "Adaptive, ";
					break;
				case 'c':
					parsed += "Created, ";
					break;
				case 's':
					parsed += "Spontaneous, ";
					break;
			}
		});
		parsed = parsed.replace(/, ([^,]*)$/, "");
	}
	parsed += "<br>";
	rgx = code.match(/(?<=M(?!uC))\S*/);
	if (rgx === null) {
		parsed += "Modifiers: Unspecified";
	} else {
		parsed += "Modifiers: ";
		rgx[0].split("/").forEach(opt => {
			switch (opt) {
				case 'pg':
					parsed += "Polyfragmented, ";
					break;
				case 'pf':
					parsed += "Polyfaceted, ";
					break;
				case 'pm':
					parsed += "Polymultiple, ";
					break;
				case 'g':
					parsed += "Gateway, ";
					break;
				case 'd':
					parsed += "Dreamway, ";
					break;
				case 'p':
					parsed += "Pyrotien, ";
					break;
				case 'ph':
					parsed += "Phytotien, ";
					break;
				case 'a':
					parsed += "Aerotien, ";
					break;
				case 'q':
					parsed += "Aquatien, ";
					break;
				case 'b':
					parsed += "Bombotien, ";
					break;
				case 'c':
					parsed += "Cryotien, ";
					break;
				case 'k':
					parsed += "Kinetien, ";
					break;
				case 'o':
					parsed += "Orbital, ";
					break;
				case 'l':
					parsed += "Layered, ";
					break;
				case 's':
					parsed += "Subsystems, ";
					break;
				case 'ps':
					parsed += "Parallel, ";
					break;
				case 'sb':
					parsed += "Soulbonds, ";
					break;
				case 't':
					parsed += "Thoughtforms, ";
					break;
				case 'm':
					parsed += "Mixed, ";
					break;
				case 'ds':
					parsed += "Disordered, ";
					break;
				case 'nd':
					parsed += "Non-disordered, ";
					break;
			}
		});
		parsed = parsed.replace(/, ([^,]*)$/, "");
	}
	parsed += "<br>";
	rgx = code.match(/(?<=C\().*?(?=\))/);
	if (rgx === null) {
		parsed += "Co-Conciousness: Unspecified";
	} else {
		parsed += "Co-Conciousness: ";
		rgx[0].split("/").forEach(opt => {
			opt = opt.trim();
			if (opt.includes("cc")) {
				switch (opt) {
					case "cc++":
						parsed += "Excellent Communication";
						break;
					case "cc+":
						parsed += "Very Good Communication";
						break;
					case "cc":
						parsed += "Average Communication";
						break;
					case "cc-":
						parsed += "Minimal Communication";
						break;
					case "cc--":
						parsed += "No Communication";
						break;
				}
				parsed += "; ";
			} else {
				switch (opt) {
					case "m++":
						parsed += "Fully Shared Memories";
						break;
					case "m+":
						parsed += "Mostly Shared Memories";
						break;
					case "m":
						parsed += "Partially Shared Memories";
						break;
					case "m-":
						parsed += "Minimally Shared Memories";
						break;
					case "m--":
						parsed += "No Shared Memories";
						break;
				}
			}
		});
		parsed = parsed.replace(/; *$/, "");
	}
	parsed += "<br>";
	rgx = code.match(/(?<=OF\().*(?=\))/);
	if (rgx === null) {
		parsed += "Outness: Unspecified";
	} else {
		parsed += "Outness: ";
		rgx[0].split("/").forEach(opt => {
			opt = opt.trim();
			if (opt.includes("r")) {
				switch (opt) {
					case "r+++":
						parsed += "Explicit (Real World)";
						break;
					case "r++":
						parsed += "Not Hidden (Real World)";
						break;
					case "r+":
						parsed += "Open (Real World)";
						break;
					case "r":
						parsed += "Friends (Real World)";
						break;
					case "r-":
						parsed += "Close Friends (Real World)";
						break;
					case "r--":
						parsed += "Deny (Real World)";
						break;
					case "r---":
						parsed += "Secret (Real World)";
						break;
				}
				parsed += "; ";
			} else {
				switch (opt) {
					case "o+++":
						parsed += "Explicit (Online)";
						break;
					case "o++":
						parsed += "Not Hidden (Online)";
						break;
					case "o+":
						parsed += "Open (Online)";
						break;
					case "o":
						parsed += "Friends (Online)";
						break;
					case "o-":
						parsed += "Close Friends (Online)";
						break;
					case "o--":
						parsed += "Deny (Online)";
						break;
					case "o---":
						parsed += "Secret (Online)";
						break;
				}
			}
		});
		parsed = parsed.replace(/; *$/, "");
	}
	parsed += "<br>";
	rgx = code.match(/(?<=R)\S*/);
	if (rgx === null) {
		parsed += "Relationships: Unspecified";
	} else {
		parsed += "Relationships: ";
		rgx[0].split("/").forEach(opt => {
			switch (opt) {
				case 'f':
					parsed += "Familial, ";
					break;
				case 'p':
					parsed += "Platonic, ";
					break;
				case 'qp':
					parsed += "Queerplatonic, ";
					break;
				case 'w':
					parsed += "Wavership, ";
					break;
				case 'q':
					parsed += "Quadrant-based, ";
					break;
				case 'r':
					parsed += "Romantic, ";
					break;
				case 'm':
					parsed += "Mentorship, ";
					break;
			}
		});
		parsed = parsed.replace(/, ([^,]*)$/, "");
	}
	parsed += "<br>";
	rgx = code.match(/(?<=X)\S*/);
	if (rgx === null) {
		parsed += "Orientations: Unspecified";
	} else {
		parsed += "Orientations: ";
		rgx[0].split("/").forEach(opt => {
			if (opt.includes('o"')) {
				const tmp = opt.match(/(?<=o").*(?=")/)[0];
				parsed += tmp.toTitleCase() + ", ";
			} else {
				switch (opt) {
					case 'g':
						parsed += "Gay, ";
						break;
					case 'l':
						parsed += "Lesbian, ";
						break;
					case 'b':
						parsed += "Bisexual, ";
						break;
					case 'p':
						parsed += "Pansexual, ";
						break;
					case 'ar':
						parsed += "Aromantic, ";
						break;
					case 'as':
						parsed += "Asexual, ";
						break;
					case 'h':
						parsed += "Heterosexual, ";
						break;
					case 'q':
						parsed += "Queer, ";
						break;
					case 'o':
						parsed += "Other, ";
						break;
				}
			}
		});
		parsed = parsed.replace(/, ([^,]*)$/, "");
	}
	parsed += "<br>";
	rgx = code.match(/(?<=G)\S*/);
	if (rgx === null) {
		parsed += "Genders: Unspecified";
	} else {
		parsed += "Genders: ";
		rgx[0].split("/").forEach(opt => {
			if (opt.includes('o"')) {
				const tmp = opt.match(/(?<=o").*(?=")/)[0];
				parsed += tmp.toTitleCase() + ", ";
			} else {
				switch (opt) {
					case 'f':
						parsed += "Female, ";
						break;
					case 'm':
						parsed += "Male, ";
						break;
					case 'n':
						parsed += "Neutral, ";
						break;
					case 'nb':
						parsed += "Non-Binary, ";
						break;
					case 'a':
						parsed += "Agender, ";
						break;
					case 'b':
						parsed += "Bigender, ";
						break;
					case 't':
						parsed += "Third Gender, ";
						break;
					case 'gf':
						parsed += "Genderfluid, ";
						break;
					case 'gq':
						parsed += "Genderqueer, ";
						break;
					case 'x':
						parsed += "Gender Questioning, ";
						break;
					case 'o':
						parsed += "Other, ";
						break;
				}
			}
		});
		parsed = parsed.replace(/, ([^,]*)$/, "");
	}
	parsed += "<br>";
	rgx = code.match(/(?<=J)\S*/);
	if (rgx === null) {
		parsed += "Outer Life: Unspecified";
	} else {
		parsed += "Outer Life: ";
		rgx[0].split("/").forEach(opt => {
			if (opt.includes('o"')) {
				const tmp = opt.match(/(?<=o").*(?=")/)[0];
				parsed += tmp.toTitleCase() + ", ";
			} else {
				switch (opt) {
					case 'pa':
						parsed += "Performing Arts, ";
						break;
					case 'a':
						parsed += "Visual Arts, ";
						break;
					case 'c':
						parsed += "Computer Science, ";
						break;
					case 'ch':
						parsed += "Child Care, ";
						break;
					case 'cr':
						parsed += "Retail, ";
						break;
					case 's':
						parsed += "Social Work, ";
						break;
					case 'ed':
						parsed += "Education, ";
						break;
					case 'en':
						parsed += "Engineering, ";
						break;
					case 'sci':
						parsed += "Science, ";
						break;
					case 'pro':
						parsed += "Professional, ";
						break;
					case 'wr':
						parsed += "Writer, ";
						break;
					case 'x':
						parsed += "Unemployed (Disabled), ";
						break;
					case 'u':
						parsed += "Unemployed, ";
						break;
					case 'us':
						parsed += "Unemployed (Student), ";
						break;
					case 'st':
						parsed += "Student, ";
						break;
					case 'o':
						parsed += "Other, ";
						break;
				}
			}
		});
		parsed = parsed.replace(/, ([^,]*)$/, "");
	}
	parsed += "<br>";
	rgx = code.match(/(?<=(?<=\s)S(?!\.))\S*/);
	if (rgx === null) {
		parsed += "Social: Unspecified";
	} else {
		parsed += "Social: ";
		rgx[0].split("/").forEach(opt => {
			if (opt.includes("r")) {
				switch (opt) {
					case "r+++":
						parsed += "Very Extroverted (Real World)";
						break;
					case "r++":
						parsed += "Extroverted (Real World)";
						break;
					case "r+":
						parsed += "Slightly Extroverted (Real World)";
						break;
					case "r":
						parsed += "Slightly Introverted (Real World)";
						break;
					case "r-":
						parsed += "Introverted (Real World)";
						break;
					case "r--":
						parsed += "Introverted (partner or roomate only) (Real World)";
						break;
					case "r---":
						parsed += "Very Introverted (Real World)";
						break;
					case "r----":
						parsed += "Antisocial (Real World)";
						break;
				}
				parsed += "; ";
			} else {
				switch (opt) {
					case "o+++":
						parsed += "Very Extroverted (Online)";
						break;
					case "o++":
						parsed += "Extroverted (Online)";
						break;
					case "o+":
						parsed += "Slightly Extroverted (Online)";
						break;
					case "o":
						parsed += "Slightly Introverted (Online)";
						break;
					case "o-":
						parsed += "Introverted (Online)";
						break;
					case "o--":
						parsed += "Introverted (partner or roomate only) (Online)";
						break;
					case "o---":
						parsed += "Very Introverted (Online)";
						break;
					case "o----":
						parsed += "Antisocial (Online)";
						break;
				}
			}
		});
	}
	parsed += "<br>";
	rgx = code.match(/R[+\-!]*(?![^+\-!])/);
	if (rgx === null) {
		parsed += "Roleplaying: Unspecified";
	} else {
		parsed += "Roleplaying: ";
		switch (rgx[0]) {
			case 'R++':
				parsed += "Major Interest";
				break;
			case 'R+':
				parsed += "Interest";
				break;
			case 'R':
				parsed += "Minor Dislike";
				break;
			case 'R-':
				parsed += "Dislike";
				break;
			case 'R--':
				parsed += "No Interest";
				break;
		}
	}
	output.innerHTML = parsed;
}

function generate() {
	const output = document.querySelector('#generator-output');
	const mc = document.querySelector('#generator-membercount').querySelector('input:checked');
	const p = document.querySelector('#generator-presentation').querySelectorAll('input:checked');
	const ba = document.querySelector('#generator-bodyage').querySelector('input:checked');
	const yma = document.querySelector('#generator-yma').querySelector('input:checked');
	const oma = document.querySelector('#generator-oma').querySelector('input:checked');
	const o = document.querySelector('#generator-origins').querySelectorAll('input:checked');
	const m = document.querySelector('#generator-modifiers').querySelectorAll('input:checked');
	const ccc = document.querySelector('#generator-ccc').querySelector('input:checked');
	const mcc = document.querySelector('#generator-mcc').querySelector('input:checked');
	const rof = document.querySelector('#generator-rof').querySelector('input:checked');
	const oof = document.querySelector('#generator-oof').querySelector('input:checked');
	const rel = document.querySelector('#generator-relationships').querySelectorAll('input:checked');
	const or = document.querySelector('#generator-orientations').querySelectorAll('input:checked');
	const ol = document.querySelector('#generator-jobs').querySelectorAll('input:checked');
	const g = document.querySelector('#generator-genders').querySelectorAll('input:checked');
	const sr = document.querySelector('#generator-sr').querySelector('input:checked');
	const so = document.querySelector('#generator-so').querySelector('input:checked');
	const rp = document.querySelector('#generator-rp').querySelector('input:checked');
	var code = "";
	if (mc.value !== "unspecified") {
		code += mc.value;
	}
	if (p.length > 0) {
		code += " P[";
		p.forEach(opt => {
			code += opt.value + "/";
		});
		code = code.replace(/\/$/, "");
		code += "]";
	}
	if (ba.value !== "unspecified") {
		code += " " + "A(" + ba.value;
	}
	if (yma.value !== "unspecified") {
		if (ba.value === "unspecified") {
			code += " " + "A(";
		}
		code += " " + yma.value;
	}
	if (oma.value !== "unspecified") {
		if (yma.value === "unspecified") {
			code += " " + "A(";
		}
		code += "/" + oma.value + ")";
	}
	if (oma.value === "unspecified" && ba.value !== "unspecified") {
		code += ")";
	}
	if (o.length > 0) {
		code += " O";
		o.forEach(opt => {
			code += opt.value + "/";
		});
		code = code.replace(/\/$/, "");
	}
	if (m.length > 0) {
		code += " M";
		m.forEach(opt => {
			code += opt.value + "/";
		});
		code = code.replace(/\/$/, "");
	}
	if (ccc.value !== "unspecified") {
		code += " " + "C(" + ccc.value;
	}
	if (mcc.value !== "unspecified") {
		if (ccc.value === "unspecified") {
			code += " " + "C(";
		}
		code += "/" + mcc.value + ")";
	}
	if (rof.value !== "unspecified") {
		code += " " + "OF(" + rof.value;
	}
	if (oma.value !== "unspecified") {
		if (rof.value === "unspecified") {
			code += " " + "OF(";
		}
		code += "/" + oof.value + ")";
	}
	if (oma.value === "unspecified" && rof.value !== "unspecified") {
		code += ")";
	}
	if (rel.length > 0) {
		code += " R";
		rel.forEach(opt => {
			code += opt.value + "/";
		});
		code = code.replace(/\/$/, "");
	}
	if (or.length > 0) {
		code += " X";
		or.forEach(opt => {
			code += opt.value + "/";
		});
		code = code.replace(/\/$/, "");
	}
	if (g.length > 0) {
		code += " G";
		g.forEach(opt => {
			code += opt.value + "/";
		});
		code = code.replace(/\/$/, "");
	}
	if (ol.length > 0) {
		code += " J";
		ol.forEach(opt => {
			code += opt.value + "/";
		});
		code = code.replace(/\/$/, "");
	}
	if (sr.value !== "unspecified") {
		code += " " + "S" + sr.value;
	}
	if (so.value !== "unspecified") {
		if (sr.value === "unspecified") {
			code += " " + "S";
		}
		code += "/" + so.value;
	}
	if (rp.value !== "unspecified") {
		code += " " + rp.value;
	}
	output.innerHTML = code;
}