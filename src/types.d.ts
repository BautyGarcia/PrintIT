export interface ContextType{
    filters: {
        type: string
    }
    handlerFilters: (filter: string) => void
}