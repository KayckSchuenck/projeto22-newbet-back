export default function notFoundError(entity:string) {
	return {
		type: "notFound",
		message: `${entity} não encontrado(a)!`
	};
}