// Aadhaar validator using Verhoeff algorithm
export function isValidAadhaar(aadhaar: string): boolean {
    if (!/^\d{12}$/.test(aadhaar)) return false;
  
    const d = [
      [0,1,2,3,4,5,6,7,8,9],
      [1,2,3,4,0,6,7,8,9,5],
      [2,3,4,0,1,7,8,9,5,6],
      [3,4,0,1,2,8,9,5,6,7],
      [4,0,1,2,3,9,5,6,7,8],
      [5,9,8,7,6,0,4,3,2,1],
      [6,5,9,8,7,1,0,4,3,2],
      [7,6,5,9,8,2,1,0,4,3],
      [8,7,6,5,9,3,2,1,0,4],
      [9,8,7,6,5,4,3,2,1,0]
    ];
  
    const p = [
      [0,1,2,3,4,5,6,7,8,9],
      [1,5,7,6,2,8,3,0,9,4],
      [5,8,0,3,7,9,6,1,4,2],
      [8,9,1,6,0,4,3,5,2,7],
      [9,4,5,3,1,2,6,8,7,0],
      [4,2,8,6,5,7,3,9,0,1],
      [2,7,9,3,8,0,6,4,1,5],
      [7,0,4,6,9,1,3,2,5,8]
    ];
  
    const inv = [0,4,3,2,1,5,6,7,8,9];
  
    let c = 0;
    const reversed = aadhaar.split('').reverse().map(Number);
    for (let i = 0; i < reversed.length; i++) {
      c = d[c][p[i % 8][reversed[i]]];
    }
    return c === 0;
  }
  
  // PAN card validator
  export const isValidPAN = (pan: string): boolean => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
  
  // License number validator
  export const isValidLicense = (license: string): boolean =>
    /^[A-Z]{2}[0-9]{2}[0-9]{11}$/.test(license.replace(/\s/g, ''));
  
  // IFSC code validator
  export const isValidIFSC = (ifsc: string): boolean =>
    /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
  
  // Account number validator
  export const isValidAccountNumber = (acc: string): boolean =>
    /^[0-9]{9,18}$/.test(acc);
  
  // Vehicle registration number
  export const isValidVehicleReg = (reg: string): boolean =>
    /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/.test(reg);
  
  // Phone number
  export const isValidPhone = (phone: string): boolean =>
    /^[6-9][0-9]{9}$/.test(phone);
  