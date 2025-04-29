<?php

namespace Entities;
use Doctrine\ORM\Mapping as ORM;
#[ORM\Entity]
class Message
{
    private int $sectionID;
    private string $title;
    //Demander à Alan une date en php
    private string $userName;
    private int $courID;
    private string $contenu;
    private string $link;

}