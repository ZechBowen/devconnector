import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { getGithubRepos } from '../../actions/profile'
import Spinner from '../layout/Spinner'

const ProfileGithub = ({ username, getGithubRepos }) => {

    useEffect(() => {
        getGithubRepos(username)
    }, [getGithubRepos])

    const repos = useSelector(state => state.profile.repos);
    //const profile = useSelector(state => state.profile);
    //console.log(username)

  return (
  <div className='profile-github'>
    <h2 className='text-primary my-1'>Github Repos</h2>
    {repos === null ? <Spinner /> : (
        repos.map(repo => (
            <div key={repo.id} className='repo bg-white p-1 my-1'>
                <div>
                    <h4>
                        <a href={repo.html_url} target='blank' rel='noopener noreferrer'>
                            {repo.name}
                        </a>
                    </h4>
                    <p>{repo.description}</p>
                </div>
                <div>
                    <ul>
                        <li className='badge badge-primary'>
                            Stars: {repos.stargazers_count}
                        </li>
                        <li className='badge badge-dark'>
                            Watchers: {repos.watchers_count}
                        </li>
                        <li className='badge badge-light'>
                            Forks: {repos.forks_count}
                        </li>
                    </ul>
                </div>
            </div>
        ))
    )}
  </div>
  )
}

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
}

export default connect(null, { getGithubRepos })(ProfileGithub)
