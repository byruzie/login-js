export function toggleIcon(passwordEl, iconId) {
  const isPassword = passwordEl.type === "password";
  passwordEl.type = isPassword ? "text" : "password";
  iconId.textContent = isPassword ? "visibility_off" : "visibility";
}
