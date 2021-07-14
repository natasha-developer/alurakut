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
  const [community, setCommunity] = useState([
    {
      id: "132132515465456432132132558",
      title: "Eu odeio acordar cedo",
      image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
    },
    {
      id: "3333558587454454556854654654",
      title: "Um mamão vai na cabeça",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: "58454654541312321548798654321",
      title: "Eu abro a geladeira pra pensar",
      image:
        "https://img10.orkut.br.com/community/be757671e0ca3a2ec37680fb349e0e6e.jpg",
    },
    {
      id: "455542146546874897654534564654",
      title: "Imagina se pega no olho?",
      image:
        "https://img10.orkut.br.com/community/6ba2ce11caf90af318cae0d436f34e99.jpg",
    },
    {
      id: "132165456498789789789798765465",
      title: "Eu nunca morri na minha vida",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: "321321654564654654465464312131321",
      title: "Tenho medo do Zé Gotinha",
      image:
        "https://i.pinimg.com/originals/2a/0d/db/2a0ddbc40eb371af7e01faedfee718e3.jpg",
    },
  ]);
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
                  id: new Date().toISOString(),
                  title: formData.get("title"),
                  image: formData.get("image"),
                };
                setCommunity([...community, newCommunityData]);
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
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
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
