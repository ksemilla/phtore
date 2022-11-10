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