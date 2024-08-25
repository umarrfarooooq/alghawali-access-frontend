import HeaderV2 from "../Header/HeaderV2";
import React from "react";
import NavCard from "./Nav-Card";

const NewHome = () => {
  const profileIcon = (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M21.3334 28V25.3333C21.3334 23.9188 20.7715 22.5623 19.7713 21.5621C18.7711 20.5619 17.4146 20 16.0001 20H8.00008C6.58559 20 5.22904 20.5619 4.22885 21.5621C3.22865 22.5623 2.66675 23.9188 2.66675 25.3333V28"
          stroke="#FFFBFA"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0001 14.6667C14.9456 14.6667 17.3334 12.2789 17.3334 9.33333C17.3334 6.38781 14.9456 4 12.0001 4C9.05456 4 6.66675 6.38781 6.66675 9.33333C6.66675 12.2789 9.05456 14.6667 12.0001 14.6667Z"
          stroke="#FFFBFA"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29.3333 28V25.3333C29.3324 24.1516 28.9391 23.0037 28.2151 22.0698C27.4911 21.1358 26.4774 20.4688 25.3333 20.1733"
          stroke="#FFFBFA"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.3333 4.17334C22.4805 4.46707 23.4973 5.13427 24.2234 6.06975C24.9496 7.00523 25.3437 8.15578 25.3437 9.34001C25.3437 10.5242 24.9496 11.6748 24.2234 12.6103C23.4973 13.5457 22.4805 14.2129 21.3333 14.5067"
          stroke="#FFFBFA"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
  const AccountIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="27"
      viewBox="0 0 28 27"
      fill="none"
    >
      <path
        d="M6.052 10.1771H11.1046"
        stroke="#FFFBFA"
        strokeWidth="1.89474"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.7899 11.4375H21.5031C19.2484 11.4375 17.4219 13.1339 17.4219 15.227C17.4219 17.32 19.2497 19.0164 21.5019 19.0164H24.7899C24.896 19.0164 24.9478 19.0164 24.992 19.0139C25.6741 18.9722 26.2172 18.4682 26.2615 17.8354C26.264 17.795 26.264 17.7457 26.264 17.6484V12.8055C26.264 12.7082 26.264 12.659 26.2615 12.6186C26.216 11.9857 25.6741 11.4817 24.992 11.44C24.9478 11.4375 24.896 11.4375 24.7899 11.4375Z"
        stroke="#FFFBFA"
        strokeWidth="1.89474"
      />
      <path
        d="M24.9558 11.4408C24.8573 9.07616 24.5415 7.62605 23.5196 6.60542C22.0404 5.125 19.6581 5.125 14.8947 5.125H11.1053C6.3419 5.125 3.95958 5.125 2.48042 6.60542C1 8.08458 1 10.4669 1 15.2303C1 19.9936 1 22.3759 2.48042 23.8551C3.95958 25.3355 6.3419 25.3355 11.1053 25.3355H14.8947C19.6581 25.3355 22.0404 25.3355 23.5196 23.8551C24.5415 22.8345 24.8585 21.3844 24.9558 19.0197"
        stroke="#FFFBFA"
        strokeWidth="1.89474"
      />
      <path
        d="M6.052 5.12348L10.7699 1.99464C11.4334 1.56307 12.2079 1.33334 12.9994 1.33334C13.7909 1.33334 14.5654 1.56307 15.2288 1.99464L19.9467 5.12348"
        stroke="#FFFBFA"
        strokeWidth="1.89474"
        strokeLinecap="round"
      />
      <path
        d="M21.198 15.2292H21.2113"
        stroke="#FFFBFA"
        strokeWidth="2.52632"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const visaIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M25 14C25 14.2652 24.8946 14.5196 24.7071 14.7071C24.5196 14.8946 24.2652 15 24 15H19C18.7348 15 18.4804 14.8946 18.2929 14.7071C18.1054 14.5196 18 14.2652 18 14C18 13.7348 18.1054 13.4804 18.2929 13.2929C18.4804 13.1054 18.7348 13 19 13H24C24.2652 13 24.5196 13.1054 24.7071 13.2929C24.8946 13.4804 25 13.7348 25 14ZM24 17H19C18.7348 17 18.4804 17.1054 18.2929 17.2929C18.1054 17.4804 18 17.7348 18 18C18 18.2652 18.1054 18.5196 18.2929 18.7071C18.4804 18.8946 18.7348 19 19 19H24C24.2652 19 24.5196 18.8946 24.7071 18.7071C24.8946 18.5196 25 18.2652 25 18C25 17.7348 24.8946 17.4804 24.7071 17.2929C24.5196 17.1054 24.2652 17 24 17ZM29 7V25C29 25.5304 28.7893 26.0391 28.4142 26.4142C28.0391 26.7893 27.5304 27 27 27H5C4.46957 27 3.96086 26.7893 3.58579 26.4142C3.21071 26.0391 3 25.5304 3 25V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H27C27.5304 5 28.0391 5.21071 28.4142 5.58579C28.7893 5.96086 29 6.46957 29 7ZM27 25V7H5V25H27ZM16.9675 20.75C17.0338 21.0069 16.9953 21.2797 16.8605 21.5082C16.7257 21.7368 16.5057 21.9024 16.2488 21.9688C15.9918 22.0351 15.7191 21.9966 15.4905 21.8618C15.262 21.727 15.0963 21.5069 15.03 21.25C14.7013 19.9675 13.3975 19 11.9987 19C10.6 19 9.2975 19.9675 8.9675 21.25C8.9012 21.5069 8.73554 21.727 8.50698 21.8618C8.27842 21.9966 8.00568 22.0351 7.74875 21.9688C7.49182 21.9024 7.27176 21.7368 7.13696 21.5082C7.00217 21.2797 6.9637 21.0069 7.03 20.75C7.3545 19.5422 8.12157 18.5007 9.17875 17.8325C8.61696 17.274 8.23363 16.5614 8.07736 15.7848C7.92109 15.0082 7.99891 14.2027 8.30096 13.4704C8.60301 12.7381 9.11568 12.112 9.774 11.6714C10.4323 11.2309 11.2066 10.9957 11.9987 10.9957C12.7909 10.9957 13.5652 11.2309 14.2235 11.6714C14.8818 12.112 15.3945 12.7381 15.6965 13.4704C15.9986 14.2027 16.0764 15.0082 15.9201 15.7848C15.7639 16.5614 15.3805 17.274 14.8188 17.8325C15.8771 18.4997 16.6448 19.5416 16.9688 20.75H16.9675ZM12 17C12.3956 17 12.7822 16.8827 13.1111 16.6629C13.44 16.4432 13.6964 16.1308 13.8478 15.7654C13.9991 15.3999 14.0387 14.9978 13.9616 14.6098C13.8844 14.2219 13.6939 13.8655 13.4142 13.5858C13.1345 13.3061 12.7781 13.1156 12.3902 13.0384C12.0022 12.9613 11.6001 13.0009 11.2346 13.1522C10.8692 13.3036 10.5568 13.56 10.3371 13.8889C10.1173 14.2178 10 14.6044 10 15C10 15.5304 10.2107 16.0391 10.5858 16.4142C10.9609 16.7893 11.4696 17 12 17Z"
        fill="#FFFBFA"
      />
    </svg>
  );

  const CustomRequirementsIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M10.0013 4.66797C9.47087 4.66797 8.96216 4.87868 8.58709 5.25376C8.21202 5.62883 8.0013 6.13754 8.0013 6.66797C8.0013 7.1984 8.21202 7.70711 8.58709 8.08218C8.96216 8.45726 9.47087 8.66797 10.0013 8.66797C10.5317 8.66797 11.0404 8.45726 11.4155 8.08218C11.7906 7.70711 12.0013 7.1984 12.0013 6.66797C12.0013 6.13754 11.7906 5.62883 11.4155 5.25376C11.0404 4.87868 10.5317 4.66797 10.0013 4.66797ZM6.0013 6.66797C6.0013 5.6071 6.42273 4.58969 7.17288 3.83954C7.92302 3.0894 8.94044 2.66797 10.0013 2.66797C11.0622 2.66797 12.0796 3.0894 12.8297 3.83954C13.5799 4.58969 14.0013 5.6071 14.0013 6.66797C14.0013 7.72883 13.5799 8.74625 12.8297 9.4964C12.0796 10.2465 11.0622 10.668 10.0013 10.668C8.94044 10.668 7.92302 10.2465 7.17288 9.4964C6.42273 8.74625 6.0013 7.72883 6.0013 6.66797ZM5.0253 12.0013C3.7213 12.0013 2.66797 13.056 2.66797 14.3586V14.8386C2.66797 15.1146 2.66797 16.716 3.6013 18.272C4.33197 19.4853 5.57064 20.5746 7.56797 21.0626C7.84153 20.3354 8.33691 19.7127 8.98397 19.2826C6.84664 19.0546 5.83597 18.1053 5.3173 17.2426C4.67197 16.168 4.66797 15.024 4.66797 14.8346V14.3586C4.66797 14.1613 4.82797 14.0013 5.0253 14.0013H10.708C10.796 13.2962 11.025 12.6161 11.3813 12.0013H5.0253ZM20.6213 12.0013C20.9693 12.604 21.204 13.28 21.2933 14.0013H26.9773C27.1746 14.0013 27.3346 14.1613 27.3346 14.3586V14.8346C27.3346 15.024 27.3306 16.168 26.6853 17.2413C26.1666 18.1053 25.156 19.0546 23.0186 19.2826C23.6586 19.7093 24.16 20.3306 24.4346 21.0626C26.432 20.5746 27.6706 19.4853 28.4 18.272C29.3346 16.716 29.3346 15.116 29.3346 14.8373V14.3573C29.3346 13.0573 28.28 12.0013 26.9773 12.0013H20.6213ZM20.0013 6.66797C20.0013 6.13754 20.212 5.62883 20.5871 5.25376C20.9622 4.87868 21.4709 4.66797 22.0013 4.66797C22.5317 4.66797 23.0404 4.87868 23.4155 5.25376C23.7906 5.62883 24.0013 6.13754 24.0013 6.66797C24.0013 7.1984 23.7906 7.70711 23.4155 8.08218C23.0404 8.45726 22.5317 8.66797 22.0013 8.66797C21.4709 8.66797 20.9622 8.45726 20.5871 8.08218C20.212 7.70711 20.0013 7.1984 20.0013 6.66797ZM22.0013 2.66797C20.9404 2.66797 19.923 3.0894 19.1729 3.83954C18.4227 4.58969 18.0013 5.6071 18.0013 6.66797C18.0013 7.72883 18.4227 8.74625 19.1729 9.4964C19.923 10.2465 20.9404 10.668 22.0013 10.668C23.0622 10.668 24.0796 10.2465 24.8297 9.4964C25.5799 8.74625 26.0013 7.72883 26.0013 6.66797C26.0013 5.6071 25.5799 4.58969 24.8297 3.83954C24.0796 3.0894 23.0622 2.66797 22.0013 2.66797ZM16.0013 12.668C15.7387 12.668 15.4786 12.7197 15.2359 12.8202C14.9933 12.9207 14.7728 13.068 14.5871 13.2538C14.4014 13.4395 14.2541 13.66 14.1535 13.9026C14.053 14.1453 14.0013 14.4053 14.0013 14.668C14.0013 14.9306 14.053 15.1907 14.1535 15.4333C14.2541 15.676 14.4014 15.8965 14.5871 16.0822C14.7728 16.2679 14.9933 16.4152 15.2359 16.5157C15.4786 16.6162 15.7387 16.668 16.0013 16.668C16.5317 16.668 17.0404 16.4573 17.4155 16.0822C17.7906 15.7071 18.0013 15.1984 18.0013 14.668C18.0013 14.1375 17.7906 13.6288 17.4155 13.2538C17.0404 12.8787 16.5317 12.668 16.0013 12.668ZM12.0013 14.668C12.0013 13.6071 12.4227 12.5897 13.1729 11.8395C13.923 11.0894 14.9404 10.668 16.0013 10.668C17.0622 10.668 18.0796 11.0894 18.8297 11.8395C19.5799 12.5897 20.0013 13.6071 20.0013 14.668C20.0013 15.7288 19.5799 16.7463 18.8297 17.4964C18.0796 18.2465 17.0622 18.668 16.0013 18.668C14.9404 18.668 13.923 18.2465 13.1729 17.4964C12.4227 16.7463 12.0013 15.7288 12.0013 14.668ZM8.66797 22.3586C8.66797 21.0546 9.72264 20.0013 11.0253 20.0013H20.9773C22.28 20.0013 23.3346 21.056 23.3346 22.3586V22.8386C23.3346 23.1146 23.3346 24.716 22.4013 26.272C21.4106 27.9173 19.4853 29.3346 16.0013 29.3346C12.5173 29.3346 10.5906 27.9173 9.6013 26.272C8.66797 24.716 8.66797 23.116 8.66797 22.8373V22.3586ZM11.0253 22.0013C10.9784 22.0013 10.9319 22.0105 10.8886 22.0285C10.8452 22.0465 10.8058 22.0728 10.7726 22.106C10.7394 22.1391 10.7131 22.1785 10.6952 22.2219C10.6772 22.2652 10.668 22.3117 10.668 22.3586V22.8346C10.668 23.024 10.672 24.168 11.3173 25.2413C11.912 26.232 13.1533 27.3346 16.0013 27.3346C18.8493 27.3346 20.0906 26.232 20.6853 25.2413C21.3306 24.168 21.3346 23.024 21.3346 22.8346V22.3586C21.3346 22.2639 21.297 22.173 21.23 22.106C21.163 22.0389 21.0721 22.0013 20.9773 22.0013H11.0253Z"
        fill="#FFFBFA"
      />
    </svg>
  );

  const AccessIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M14.2208 15.8993C15.7989 15.8993 17.3123 15.2725 18.4282 14.1567C19.544 13.0409 20.1709 11.5276 20.1709 9.94967C20.1709 8.37172 19.544 6.8584 18.4282 5.74262C17.3123 4.62684 15.7989 4 14.2208 4C12.6428 4 11.1293 4.62684 10.0135 5.74262C8.89763 6.8584 8.27075 8.37172 8.27075 9.94967C8.27075 11.5276 8.89763 13.0409 10.0135 14.1567C11.1293 15.2725 12.6428 15.8993 14.2208 15.8993Z"
        stroke="#262F32"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 27.795C4 23.19 8.58155 19.4655 14.2222 19.4655C15.4598 19.4655 16.6498 19.644 17.7566 19.9772"
        stroke="#262F32"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0302 25.7622L21.1706 26.9026M26.4265 24.493C25.9423 24.9759 25.3354 25.3175 24.6714 25.4809C24.0073 25.6443 23.3112 25.6233 22.6581 25.4201L20.3227 27.7504C20.1541 27.924 19.8219 28.0281 19.5839 27.9934L18.503 27.8446C18.146 27.7951 17.8138 27.4579 17.7592 27.1009L17.6105 26.0201C17.5758 25.7821 17.6898 25.4499 17.8535 25.2813L20.1839 22.951C19.7872 21.6619 20.0946 20.1993 21.1161 19.1829C22.5788 17.7203 24.9539 17.7203 26.4216 19.1829C27.8892 20.6455 27.8892 23.0304 26.4265 24.493Z"
        stroke="#262F32"
        strokeWidth="1.33333"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.0001 22.6667C24.3537 22.6667 24.6928 22.5262 24.9429 22.2761C25.1929 22.0261 25.3334 21.687 25.3334 21.3333C25.3334 20.9797 25.1929 20.6406 24.9429 20.3905C24.6928 20.1405 24.3537 20 24.0001 20C23.6465 20 23.3073 20.1405 23.0573 20.3905C22.8072 20.6406 22.6667 20.9797 22.6667 21.3333C22.6667 21.687 22.8072 22.0261 23.0573 22.2761C23.3073 22.5262 23.6465 22.6667 24.0001 22.6667Z"
        stroke="#262F32"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const AgentRequestsIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M25.3334 28V25.3333C25.3334 23.9188 24.7715 22.5623 23.7713 21.5621C22.7711 20.5619 21.4146 20 20.0001 20H12.0001C10.5856 20 9.22904 20.5619 8.22885 21.5621C7.22865 22.5623 6.66675 23.9188 6.66675 25.3333V28"
        stroke="#262F32"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.0001 14.6667C18.9456 14.6667 21.3334 12.2789 21.3334 9.33333C21.3334 6.38781 18.9456 4 16.0001 4C13.0546 4 10.6667 6.38781 10.6667 9.33333C10.6667 12.2789 13.0546 14.6667 16.0001 14.6667Z"
        stroke="#262F32"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const navItems = [
    {
      itemName: "Profiles",
      cardBg: "bg-[#FFF2F2]",
      iconBg: "bg-[#FF4646]",
      icon: profileIcon,
    },
    {
      itemName: "Accounts",
      cardBg: "bg-[#E2F2FF]",
      iconBg: "bg-[#46A0FF]",
      icon: AccountIcon,
    },
    {
      itemName: "Visa Handle",
      cardBg: "bg-[#F2E2FF]",
      iconBg: "bg-[#AA46FF]",
      icon: visaIcon,
    },
    {
      itemName: "Requirements",
      cardBg: "bg-[#FFF5E2]",
      iconBg: "bg-[#FFA546]",
      icon: CustomRequirementsIcon,
    },
    {
      itemName: "Access",
      cardBg: "bg-[#E2FFE8]",
      iconBg: "bg-[#46FF7A]",
      icon: AccessIcon,
    },
    {
      itemName: "Agent Requests",
      cardBg: "bg-[#E7FFFB]",
      iconBg: "bg-[#7DFFE9]",
      icon: AgentRequestsIcon,
    },
  ];

  return (
    <div>
      <HeaderV2 />
      <div className="p-4 md:p-8">
        <div className="grid md:hidden grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-8 p-4 md:p-8 rounded-xl bg-[#FFFBFA] border border-[#031d921a]">
          <NavCard
            itemName="Profiles"
            cardBg="bg-[#FFF2F2]"
            iconBg="bg-[#FF4646]"
            icon={profileIcon}
          />
          <NavCard
            itemName="Accounts"
            cardBg="bg-[#E2F2FF]"
            iconBg="bg-[#46A0FF]"
            icon={AccountIcon}
          />
          <NavCard
            itemName="Visa Handle"
            cardBg="bg-[#F2E2FF]"
            iconBg="bg-[#AA46FF]"
            icon={visaIcon}
          />
          <NavCard
            itemName="Requirements"
            cardBg="bg-[#FFF5E2]"
            iconBg="bg-[#FFA546]"
            icon={CustomRequirementsIcon}
          />
          <NavCard
            itemName="Access"
            cardBg="bg-[#E2FFE8]"
            iconBg="bg-[#46FF7A]"
            icon={AccessIcon}
          />
          <NavCard
            itemName="Agent Requests"
            cardBg="bg-[#E7FFFB]"
            iconBg="bg-[#7DFFE9]"
            icon={AgentRequestsIcon}
          />
        </div>
        <div className="md:flex flex-col gap-8 hidden lg:hidden">
          <div className="grid md:grid-cols-3 md:gap-4 md:p-8 rounded-xl bg-[#FFFBFA] border border-[#031d921a]">
            <NavCard
              itemName="Profiles"
              cardBg="bg-[#FFF2F2]"
              iconBg="bg-[#FF4646]"
              icon={profileIcon}
            />
            <NavCard
              itemName="Accounts"
              cardBg="bg-[#E2F2FF]"
              iconBg="bg-[#46A0FF]"
              icon={AccountIcon}
            />
            <NavCard
              itemName="Visa Handle"
              cardBg="bg-[#F2E2FF]"
              iconBg="bg-[#AA46FF]"
              icon={visaIcon}
            />
          </div>
          <div className="grid md:grid-cols-3 md:gap-4 md:p-8 rounded-xl bg-[#FFFBFA] border border-[#031d921a]">
            <NavCard
              itemName="Access"
              cardBg="bg-[#E2FFE8]"
              iconBg="bg-[#46FF7A]"
              icon={AccessIcon}
            />
            <NavCard
              itemName="Requirements"
              cardBg="bg-[#FFF5E2]"
              iconBg="bg-[#FFA546]"
              icon={CustomRequirementsIcon}
            />
            <NavCard
              itemName="Agent Requests"
              cardBg="bg-[#E7FFFB]"
              iconBg="bg-[#7DFFE9]"
              icon={AgentRequestsIcon}
            />
          </div>
        </div>
        <div className="flex-col gap-8 hidden lg:flex">
          <div className="grid md:grid-cols-4 md:gap-4 md:p-8 rounded-xl bg-[#FFFBFA] border border-[#031d921a]">
            <NavCard
              itemName="Profiles"
              cardBg="bg-[#FFF2F2]"
              iconBg="bg-[#FF4646]"
              icon={profileIcon}
            />
            <NavCard
              itemName="Accounts"
              cardBg="bg-[#E2F2FF]"
              iconBg="bg-[#46A0FF]"
              icon={AccountIcon}
            />
            <NavCard
              itemName="Visa Handle"
              cardBg="bg-[#F2E2FF]"
              iconBg="bg-[#AA46FF]"
              icon={visaIcon}
            />
            <NavCard
              itemName="Access"
              cardBg="bg-[#E2FFE8]"
              iconBg="bg-[#46FF7A]"
              icon={AccessIcon}
            />
          </div>
          <div className="grid lg:grid-cols-2 md:gap-4 md:p-8 rounded-xl bg-[#FFFBFA] border border-[#031d921a]">
            <NavCard
              itemName="Requirements"
              cardBg="bg-[#FFF5E2]"
              iconBg="bg-[#FFA546]"
              icon={CustomRequirementsIcon}
            />
            <NavCard
              itemName="Agent Requests"
              cardBg="bg-[#E7FFFB]"
              iconBg="bg-[#7DFFE9]"
              icon={AgentRequestsIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHome;