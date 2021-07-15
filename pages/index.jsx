import React, { useState, useEffect } from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img
        src={`http://github.com/${props.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const [community, setCommunity] = useState([]);
  const user = "natasha-developer";
  const friends = [
    "rocketseat-education",
    "diego3g",
    "maykbrito",
    "filipedeschamps",
    "Ricardo-coder",
    "thaiscruv",
  ];

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/natasha-developer/followers")
      .then(function (data) {
        return data.json();
      })
      .then(function (dataList) {
        setFollowers(dataList);
      });
  }, []);

  const [following, setFollowing] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/natasha-developer/following")
      .then(function (followingData) {
        return followingData.json();
      })
      .then(function (followingDataList) {
        setFollowing(followingDataList);
      });

    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "f506b84d601aec49c30ee647fb6bd2",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }`,
      }),
    })
      .then((communityData) => communityData.json())
      .then((communityDataList) => {
        const communities = communityDataList.data.allCommunities;
        console.log(communities);
        setCommunity(communities);
      });
  }, []);

  function ProfileRelationsBox(props) {
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {props.title} ({props.items.length})
        </h2>
        <ul>
          {props.items.map((user) => {
            return (
              <li key={user.id}>
                <a href={user.html_url}>
                  <img src={user.avatar_url} />
                  <span>{user.login}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </ProfileRelationsBoxWrapper>
    );
  }

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newCommunityData = {
                  title: formData.get("title"),
                  imageUrl: formData.get("image"),
                  creatorSlug: user,
                };
                fetch("/api/comunidades", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newCommunityData),
                }).then(async (response) => {
                  const data = await response.json();
                  const newCommunityData = data.record;
                  setCommunity([...community, newCommunityData]);
                });
              }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox title="Seguidores" items={followers} />
          <ProfileRelationsBox title="Seguindo" items={following} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({community.length})</h2>
            <ul>
              {community.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/comunidades/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
