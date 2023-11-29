import { jwtDecode } from "jwt-decode";

export const VerifyStaffToken = () => {
  const staffToken = localStorage.getItem("staffToken");

  if (!staffToken) {
    return { valid: false, roles: [] };
  }

  try {
    const decoded = jwtDecode(staffToken);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      return { valid: false, roles: [] };
    }

    const staffRoles = decoded.staffRoles;
    const staffName = decoded.staffName;
    return { valid: true, roles: staffRoles, verifyToken:staffToken, staffName:staffName };
  } catch (error) {
    return { valid: false, roles: [] };
  }
};
