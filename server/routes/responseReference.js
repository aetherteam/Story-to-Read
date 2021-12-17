if (result.success) {
  reply.code(200).send({ data: result.data });
} 
else {
  reply.code(result.code).send({ message: result.message });
}
