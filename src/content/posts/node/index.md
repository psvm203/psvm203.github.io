---
title: Node.js와 pnpm 설치하기
published: 2026-05-30
description: 윈도우, 맥, 리눅스에서의 설치법
tags: []
category: 웹
draft: false
---

`Node.js`는 자바스크립트를 브라우저 밖에서 실행할 수 있는 런타임 환경이다.\
현재 자바스크립트 런타임의 사실상 표준 위치를 차지하고 있다.

`pnpm`은 `Node.js` 생태계에서 사용하는 패키지 매니저다.\
`npm`과 같은 역할을 하지만, 패키지 설치 속도가 빠르고 디스크 공간을 적게 차지한다.

이 글에서는 `Node.js`와 `pnpm`을 설치하는 법을 정리하려 한다.

## Windows

### 방법 1: msi 프로그램

방법은 간단하지만 웹페이지에 접속해야 한다는 단점이 있다.\
https://nodejs.org/ko/download 에 들어가 아래처럼 생긴 버튼을 눌러 `Node.js`를 설치한다.

<a href="https://nodejs.org/ko/download" class="w-full min-w-56 sm:w-auto" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;color:#fff;padding:8px 16px;border:1px solid #417e38;border-radius:.25rem;background-color:#417e38;font-weight:500;font-size:14px;text-decoration:none;box-sizing:border-box;box-shadow:0 1px 2px 0 rgba(16,24,40,.05);">Windows 설치 프로그램 (.msi)</a>

그 후 아래 명령어로 `pnpm`을 설치한다.

```shell
npm install -g corepack@latest
corepack enable pnpm
```

### 방법 2: winget

터미널 하나로 모든 설치 작업을 수행할 수 있어 편리하다.\
아래 명령어로 `Node.js`와 `pnpm`을 설치한다.

```shell
winget install OpenJS.NodeJS.LTS
npm install -g corepack@latest
corepack enable pnpm
```

### 방법 3: fnm

여러 버전의 `Node.js`를 사용해야 할 일이 있을 때 특히 유용하다.

```shell
winget install Schniz.fnm
fnm install --lts
npm install -g corepack@latest
corepack enable pnpm
```

## macOS

### 방법 1: Homebrew

아래 명령어로 `Node.js`와 `pnpm`을 설치한다.

```shell
brew install node
npm install -g corepack@latest
corepack enable pnpm
```

### 방법 2: fnm

여러 버전의 `Node.js`를 사용해야 할 일이 있을 때 특히 유용하다.

```shell
brew install fnm
fnm install --lts
npm install -g corepack@latest
corepack enable pnpm
```

## Linux

### 방법 1: fnm

```shell
curl -o- https://fnm.vercel.app/install | bash
fnm install --lts
npm install -g corepack@latest
corepack enable pnpm
```

`apt` 로도 설치가 가능하지만, apt 저장소에는 `fnm`이 존재하지 않아 `Node.js`를 직접 설치해야하는데, `npm`과 분리되어 설치되고, 버전도 오래된 경우가 많아 `fnm`으로 설치하는 걸 권장한다.
