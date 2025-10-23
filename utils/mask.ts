export function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;

  if (name.length <= 2) {
    return `${name[0]}****@${domain}`;
  }

  return `${name[0]}****${name[name.length - 1]}@${domain}`;
}

export function maskPhone(phone: string) {
  // Example: +639171234567 → +63 **** 4567
  return phone.replace(/(\+\d{2})\d{4}(\d{4})/, "$1 **** $2");
}
