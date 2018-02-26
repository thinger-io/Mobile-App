//@flow

type NAVIGATE = { type: "Navigation/NAVIGATE", routeName: string };
type GO_BACK = { type: "Navigation/BACK" };
type GO_TO_MAIN = { type: "Navigation/MAIN" };

export type NavAction = NAVIGATE | GO_BACK | GO_TO_MAIN;

export function navigate(screen: string): NAVIGATE {
  return {
    type: "Navigation/NAVIGATE",
    routeName: screen
  };
}

export function goBack(): GO_BACK {
  return {
    type: "Navigation/BACK"
  };
}

export function goToMain(): GO_TO_MAIN {
  return {
    type: "Navigation/MAIN"
  };
}
