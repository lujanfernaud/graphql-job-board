const endpointURL = 'http://localhost:9000/graphql'

async function graphqlRequest(query, variables={}) {
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({query, variables})
  })

  const responseBody = await response.json()

  if (responseBody.errors) {
    const messages = responseBody.errors.map(error => `\n- ${error.message}`)

    throw new Error(`GraphQL Error:${messages}`)
  }

  return responseBody.data
}

export async function loadJobs() {
  const query = `{
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }`

  const { jobs } = await graphqlRequest(query)

  return jobs
}

export async function loadJob(id) {
  const query = `query JobQuery($id: ID!) {
    job(id: $id) {
      id
      title
      description
      company {
        id
        name
      }
    }
  }`

  const { job } = await graphqlRequest(query, {id})

  return job
}

export async function loadCompany(id) {
  const query = `query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
    }
  }`

  const { company } = await graphqlRequest(query, {id})

  return company
}