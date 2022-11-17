import { ApolloError } from "@apollo/client"

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const logError = (error: Record<string, any> | ApolloError | undefined) => {
  if (error?.message) {
    console.log("[ERROR]", error.message)
  } else {
    console.log("[ERROR]",error)
  }
}


type UnknownArrayOrObject = Record<string, any>;

export const dirtyValues = (
  dirtyFields: UnknownArrayOrObject | boolean,
  allValues: UnknownArrayOrObject
): UnknownArrayOrObject => {
  // NOTE: Recursive function.

  // If *any* item in an array was modified, the entire array must be submitted, because there's no
  // way to indicate "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues;
  }

  // Here, we have an object.

  if (typeof dirtyFields !== "boolean" && typeof allValues !== 'boolean') {
    return Object.fromEntries(
      Object.keys(dirtyFields).map((key) => [key, dirtyValues(dirtyFields[key], allValues[key])])
    );
  }

  return {}
}
