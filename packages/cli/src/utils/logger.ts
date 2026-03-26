/* -------------------------------------------------------------------------- */
/*  DigiFemmes CLI — Logger                                                    */
/*  Colored console output with brand styling                                  */
/* -------------------------------------------------------------------------- */

/** ANSI escape codes */
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';

// Brand colors (closest ANSI approximations)
const ORANGE = '\x1b[38;2;255;123;0m';   // DigiFemmes orange
const BLUE = '\x1b[38;2;18;184;223m';    // DigiFemmes blue
const GREEN = '\x1b[38;2;0;149;120m';    // DigiFemmes green
const RED = '\x1b[38;2;220;38;38m';      // Error red
const YELLOW = '\x1b[38;2;255;193;7m';   // Warning yellow
const GRAY = '\x1b[38;2;158;158;158m';   // Neutral

/* -------------------------------------------------------------------------- */
/*  Public API                                                                 */
/* -------------------------------------------------------------------------- */

export function success(message: string): void {
  console.log(`${GREEN}${BOLD}\u2713${RESET} ${GREEN}${message}${RESET}`);
}

export function error(message: string): void {
  console.error(`${RED}${BOLD}\u2717${RESET} ${RED}${message}${RESET}`);
}

export function info(message: string): void {
  console.log(`${BLUE}${BOLD}\u2139${RESET} ${BLUE}${message}${RESET}`);
}

export function warning(message: string): void {
  console.warn(`${YELLOW}${BOLD}\u26A0${RESET} ${YELLOW}${message}${RESET}`);
}

export function step(index: number, total: number, message: string): void {
  const counter = `${DIM}[${index}/${total}]${RESET}`;
  console.log(`${counter} ${message}`);
}

export function brand(message: string): void {
  console.log(`${ORANGE}${BOLD}${message}${RESET}`);
}

export function dim(message: string): void {
  console.log(`${GRAY}${message}${RESET}`);
}

export function newLine(): void {
  console.log('');
}

/** Print the DigiFemmes CLI banner */
export function banner(): void {
  newLine();
  console.log(`${ORANGE}${BOLD}  DigiFemmes${RESET} ${BLUE}Design System CLI${RESET}`);
  console.log(`${GRAY}  ────────────────────────────${RESET}`);
  newLine();
}

export const logger = {
  success,
  error,
  info,
  warning,
  step,
  brand,
  dim,
  newLine,
  banner,
};
