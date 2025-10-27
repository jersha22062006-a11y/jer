document.addEventListener("DOMContentLoaded", () => { 
    // Get elements with null checks 
    const usernameRef = document.getElementById("username"); 
    const passwordRef = document.getElementById("pass"); 
    const submitbtn = document.getElementById("submit"); 
    const messageRef = document.getElementById("message-ref"); 
 
    if (!usernameRef || !passwordRef || !submitbtn || !messageRef) { 
        console.error("One or more form elements not found!"); 
        return; 
    } 
 
    // Improved validation functions (with trim and better regex flags) 
    const isUsernameValid = () => { 
        const value = usernameRef.value.trim(); 
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{4,32}$/i; // Removed /g, added $ for end anchor 
        return usernameRegex.test(value); 
    }; 
 
    const isPasswordValid = () => { 
        const value = passwordRef.value; 
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Removed /gm 
        return passwordRegex.test(value); 
    }; 
 
     
    const updateInputStyle = (input, isValid) => { 
        messageRef.style.visibility = "hidden"; // Hide message on input change 
        input.classList.remove("input-invalid", "input-valid", "input-neutral"); 
         
        if (isValid) { 
            input.classList.add("input-valid"); 
        } else { 
            input.classList.add("input-invalid"); 
        } 
    }; 
 
    // Initial neutral state 
    const setNeutralState = (input) => { 
        input.classList.remove("input-invalid", "input-valid"); 
        input.classList.add("input-neutral"); 
    }; 
    setNeutralState(usernameRef); 
    setNeutralState(passwordRef); 
 
    // Username input listener 
    usernameRef.addEventListener("input", () => { 
        updateInputStyle(usernameRef, isUsernameValid()); 
    }); 
 
    // Password input listener 
    passwordRef.addEventListener("input", () => { 
        updateInputStyle(passwordRef, isPasswordValid()); 
    }); 
 
    // Button hover effect (simplified: subtle shake if invalid; add mouseleave reset) 
    // Commented out the complex translate—replace with this if you want a shake effect 
    submitbtn.addEventListener("mouseenter", () => { 
        if (!isUsernameValid() || !isPasswordValid()) { 
            submitbtn.style.transform = "translateX(5px)"; // Subtle move instead of huge translate 
            submitbtn.style.transition = "transform 0.2s ease"; 
        } 
    }); 
 
    submitbtn.addEventListener("mouseleave", () => { 
        submitbtn.style.transform = "translateX(0)"; // Always reset 
    }); 
 
    // Submit click: Validate before showing message; prevent if invalid 
    submitbtn.addEventListener("click", (e) => { 
        const usernameValid = isUsernameValid(); 
        const passwordValid = isPasswordValid(); 
 
        if (!usernameValid || !passwordValid) { 
            e.preventDefault(); // Stop form submission if in a <form> 
            messageRef.textContent = "Please fix errors above."; // Dynamic text 
            messageRef.style.color = "#fe2e2e"; // Red for error 
        } else { 
            messageRef.textContent = "Login successful!"; // Or your success 
message 
            messageRef.style.color = "#34bd34"; 
             
        } 
        messageRef.style.visibility = "visible"; 
 
        // Optional: Reset fields after success 
        // usernameRef.value = ""; passwordRef.value = ""; 
    }); 
});