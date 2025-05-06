export function AutoGenerateHighlightText(target: any, context: ClassFieldDecoratorContext) {
  return function (this: any) {
    return this.context?.join(' ') || ''
  }
}
